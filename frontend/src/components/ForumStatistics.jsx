import { useState } from "react";

export default function ForumStatistics() {
  const [statistics] = useState([
    { label: "Topics", value: 5432 },
    { label: "Posts", value: 24876 },
    { label: "Users", value: 1245 },
    { label: "Members", value: 8923 },
  ]);

  return (
    <section className="bg-white shadow-lg rounded-lg w-full">
      <div className="px-4 pt-4 pb-2 text-xl font-bold text-gray-800">
        Forum Statistics
      </div>
    
      <div className="flex flex-col">
        {statistics.map((item, index) => (
          <div
            key={index}
            className="flex justify-between px-4 py-2 text-sm text-gray-700"
          >
            <span className="font-semibold text-gray-500">{item.label}</span>
            <span className="font-bold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
