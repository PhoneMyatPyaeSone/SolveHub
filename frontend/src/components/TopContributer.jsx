import { useState, useEffect } from "react";
import api from "../api/axios";

export default function TopContributer() {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopContributors();
    }, []);

    const fetchTopContributors = async () => {
      try {
        const response = await api.get("/users/statistics/all");
        const topContributors = response.data.slice(0, 3).map((user, index) => ({
            posts: user.posts || user.post_count || 0,
            name: user.full_name || user.name || "Unknown",
            username: user.username || "unknown_user",
            id: user.id
        }));
        
        setStatistics(topContributors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top contributors:", err);
        setLoading(false);
      }
    };

    return(
        <section className="bg-white shadow-lg rounded-lg w-full">
        <div className="px-4 pt-4 pb-2 text-xl font-bold text-gray-800">
            Top Contributers
        </div>

        <div className="flex flex-col">
        {loading ? (
            <div className="px-4 py-4 text-center text-gray-500">Loading...</div>
        ) : statistics.length === 0 ? (
            <div className="px-4 py-4 text-center text-gray-500">No contributors found</div>
        ) : (
            statistics.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 text-sm text-gray-700"
              >
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{item.name} </span>
                    <span className="font-bold text-gray-500 text-sm">{item.posts} posts</span>
                </div>
                
                <span 
                    className={`px-2 py-1 text-xs font-semibold ${
                        item.status === "Top" ? "bg-yellow-100 text-gray-800" : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {item.status}
                </span>
              </div>
            ))
        )}
        </div>
        </section>
    )
}