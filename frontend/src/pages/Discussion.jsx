import { FaComments, FaHeartbeat, FaLaptopCode, FaChartLine, FaGraduationCap, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import DiscussionSearch from "../components/DiscussionSearch";
import DiscussionCard from "../components/DicussionCard"
import DiscussionForm from "../components/DiscussionForm";
import api from "../api/axios";


export default function Discussions() {
    const [discussions, setDiscussions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchDiscussions();
    }, [selectedCategory]);

    const fetchDiscussions = async () => {
        try {
        setLoading(true);
        const response = await api.get("/discussions", {
            params: selectedCategory ? { category: selectedCategory } : {},
        });
        setDiscussions(response.data);
        } catch (error) {
        console.error("Error fetching discussions:", error);
        } finally {
        setLoading(false);
        }
    };
    const categories = [
        { label: "General Discussions", value: "General" },
        { label: "Technology", value: "Technology" },
        { label: "Education", value: "Education" },
        { label: "Health & Wellness", value: "Health" },
        { label: "Business", value: "Business" },
    ];

    const handleNewDiscussion = () => {
        setShowForm((prev) => !prev);   
    };

    const handleDiscussionCreated = (newDiscussion) => {
        setDiscussions([newDiscussion, ...discussions]);
        setShowForm(false);
    };

  return (
    <section className="p-4">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Left column */}
        <div className="md:w-1/4 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-bold text-gray-600">Category</div>

            {categories.map((cat) => (
                <div
                key={cat.value}
                className={`p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer ${
                    selectedCategory === cat.value ? "bg-blue-200 text-blue-800 font-semibold" : ""
                }`}
                onClick={() => setSelectedCategory(cat.value)}
                >
                <FaComments /> {cat.label}
                </div>
            ))}

            <div className="text-lg font-bold text-gray-600 mt-3">Popular Tags</div>

            <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm">#webdev</div>
                <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm">#design</div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm">#startup</div>
                <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm">#ai</div>
                <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm">#ux</div>
            </div>


            <div className="text-lg font-bold text-gray-600 mt-3">Top Contributors</div>
            
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <FaUser size={16} /> Alex Johnson
                    </div>
                    <div className="ml-5 text-gray-500 text-sm">1248 posts</div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <FaUser size={16} /> Maria Gracia
                    </div>
                    <div className="ml-5 text-gray-500 text-sm">1248 posts</div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <FaUser size={16} /> Sam Wilson
                    </div>
                    <div className="ml-5 text-gray-500 text-sm">1248 posts</div>
                </div>
            </div>
        </div>


        {/* Right blocks horizontally stacked */}
        <div className="md:w-3/4 flex flex-col gap-4">
            <DiscussionSearch onNewDiscussionClick={handleNewDiscussion}/>
            
            {showForm && <DiscussionForm onCreated={handleDiscussionCreated} />}
            {
                loading ? (
                <div className="text-center text-gray-500 py-8">Loading discussions...</div>
            ) : discussions.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No discussions found.</div>
            ) : (
                discussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
                ))
            )
            }
            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-blue-500 hover:text-white transition"
                    >
                        {page}
                    </button>
                ))}
                <button className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-blue-500 hover:text-white transition">
                    &#62;
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}
