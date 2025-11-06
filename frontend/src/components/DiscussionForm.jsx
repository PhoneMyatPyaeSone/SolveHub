import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function DiscussionForm({ onCreated }) {
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in to post a discussion.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await api.post(
        "/discussions/",
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

      onCreated(response.data); // Add new discussion to list
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
    } catch (err) {
      console.error("Error creating discussion:", err);
      setError("Failed to create discussion. Try again.");
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Create New Discussion
      </h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded focus:ring-2 focus:ring-blue-300"
        />

        {/* Content */}
        <textarea
          placeholder="Write your discussion content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="border p-2 rounded h-32 resize-none focus:ring-2 focus:ring-blue-300"
        ></textarea>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 rounded focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Tags */}
        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-300"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Discussion"}
        </button>
      </form>
    </div>
  );
}
