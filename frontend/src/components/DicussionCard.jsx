import { FaEdit, FaTrash, FaSave, FaTimes, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function DiscussionCard({ discussion, onDeleted, onUpdated }) {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(discussion.title);
  const [content, setContent] = useState(discussion.content);
  const [category, setCategory] = useState(discussion.category?.[0] || "");
  const [tags, setTags] = useState(discussion.tags?.join(", ") || "");
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState(discussion.votes || 0);
  const [voting, setVoting] = useState(false);
  const [userVote, setUserVote] = useState(null); // 'upvote', 'downvote', or null

  const isAuthor = isAuthenticated && user && user.id === discussion.user_id;
  
  // Fetch user's vote status on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchVoteStatus();
    }
  }, [discussion.id, isAuthenticated]);

  const fetchVoteStatus = async () => {
    try {
      const response = await api.get(
        `/discussions/${discussion.id}/vote-status`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.voted) {
        setUserVote(response.data.vote_type);
      }
    } catch (err) {
      console.error("Error fetching vote status:", err);
    }
  };
  
  const handleVote = async (voteType) => {
    if (!isAuthenticated) {
      return alert("You must be logged in to vote.");
    }
    
    try {
      setVoting(true);
      const response = await api.post(
        `/discussions/${discussion.id}/vote/${voteType}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setVotes(response.data.votes);
      setUserVote(response.data.user_vote);
    } catch (err) {
      console.error("Error voting:", err);
      alert("Failed to register vote.");
    } finally {
      setVoting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!isAuthenticated) return alert("You must be logged in to delete.");
    if (!window.confirm("Are you sure you want to delete this discussion?")) return;

    try {
      await api.delete(`/discussions/${discussion.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Discussion deleted successfully.");
      if (onDeleted) onDeleted(discussion.id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete discussion.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(discussion.title);
    setContent(discussion.content);
    setCategory(discussion.category?.[0] || "");
    setTags(discussion.tags?.join(", ") || "");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/discussions/${discussion.id}`,
        {
          title,
          content,
          category: category ? [category] : [],
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (onUpdated) onUpdated(response.data);
      setIsEditing(false);
      alert("Discussion updated successfully!");
    } catch (err) {
      console.error("Error updating discussion:", err);
      alert("Failed to update discussion.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "General",
    "Technology",
    "Education",
    "Health",
    "Business",
  ];

  // Edit Mode
  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-300">
        <h3 className="text-lg font-bold text-gray-700 mb-3">Edit Discussion</h3>
        
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-300"
          />

          <textarea
            placeholder="Write your discussion content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded h-32 resize-none focus:ring-2 focus:ring-blue-300"
          ></textarea>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-300"
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition"
            >
              <FaSave /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition relative">
      <h2 className="text-xl font-bold text-gray-800">{discussion.title}</h2>
      <p className="text-gray-600 mt-2">{discussion.content}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {discussion.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="text-gray-400 text-sm">
          {discussion.views || 0} views
        </div>
        
        {/* Voting Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleVote("upvote")}
            disabled={voting}
            className={`flex items-center gap-1 transition ${
              userVote === "upvote"
                ? "text-green-600 font-bold"
                : "text-gray-500 hover:text-green-600"
            } disabled:opacity-50`}
          >
            <FaThumbsUp size={18} /> 
          </button>
          <span className={`font-semibold text-lg ${
            votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {votes}
          </span>
          <button
            onClick={() => handleVote("downvote")}
            disabled={voting}
            className={`flex items-center gap-1 transition ${
              userVote === "downvote"
                ? "text-red-600 font-bold"
                : "text-gray-500 hover:text-red-600"
            } disabled:opacity-50`}
          >
            <FaThumbsDown size={18} />
          </button>
        </div>
      </div>
      
      {isAuthor && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}