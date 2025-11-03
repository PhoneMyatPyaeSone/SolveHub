import { useState } from "react";

export default function TopContributer() {
    const [statistics] = useState([
            { name: "Alex Johnson", posts: 5432, status: 'Top' },
            { name: "Alex Johnson", posts: 5432, status: 'Active' },
            { name: "Alex Johnson", posts: 5432, status: 'Active' },
        ]);

    return(
        <section className="bg-white shadow-lg rounded-lg w-full">
        <div className="px-4 pt-4 pb-2 text-xl font-bold text-gray-800">
            Top Contributers
        </div>

        <div className="flex flex-col">
        {statistics.map((item, index) => (
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
        ))}
        </div>
        </section>
    )
    
}