import { useState } from "react";


export default function RecentActivity() {
    const [statistics] = useState([
                { name: "Alex Johnson", activity: "joined the forum", status: '10 minutes ago' },
                { name: "Alex Johnson", activity: 'replied to "Web peformance tips', status: '1 hour ago' },
                { name: "Alex Johnson", activity: 'recieved 50 likes', status: '30 minutes ago' },
            ]);
    
        return(
            <section className="bg-white shadow-lg rounded-lg w-full">
            <div className="px-4 pt-4 pb-2 text-xl font-bold text-gray-800">
                Recent Activity
            </div>
    
            <div className="flex flex-col">
            {statistics.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 text-sm text-gray-700"
              >
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{item.name} </span>
                    <span className="font-bold text-gray-400 text-sm">{item.status} </span>
                </div>
                
                <span className= "px-2 py-1 text-xs text-gray-700"> {item.activity} </span>
              </div>
            ))}
            </div>
            </section>
        )
}