import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function RecentDiscussion() {
    const [statistics] = useState([
        { question: "How to optimize web application performance?", startBy: "Alex Johnson", field: "in Technology" , post: {replies:28, views: 1000, lastPost: 3} },
        { question: "Posts", startBy: "Alex Johnson", field: "in Business & Finance" , post: {replies:28, views: 1000, lastPost: 3} },
        { question: "Users", startBy: "Alex Johnson", field: "in Business & Finance" , post: {replies:28, views: 1000, lastPost: 3} },
        { question: "Members", startBy: "Alex Johnson", field: "in Business & Finance" , post: {replies:28, views: 1000, lastPost: 3} },
    ]);
        
    return(
        <section className="bg-white shadow-lg p-3 rounded-lg w-full">
            <div className="px-4 pt-4 pb-2 text-xl font-bold text-gray-800">
                Recent Discussions
            </div>


            <div className="flex flex-col">
                {statistics.map((item, index) => (
                <div
                    key={index}
                    className="flex justify-between px-4 py-2 text-sm text-gray-700"
                >
                    <div className="w-full flex flex-col">
                        {/* Question title */}
                        <span className="font-semibold text-gray-800">{item.question}</span>

                        {/* Started by + Field */}
                        <div className="flex space-x-4 text-md text-gray-500 mt-1">
                            Started by<span className="ml-4 font-semibold tex-gray-600">{item.startBy}</span>
                            <span>{item.field}</span>
                        </div>

                        {/* Post properties */}
                        <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                            <span>{item.post.replies} replies</span>
                            <span>{item.post.views} views</span>
                            <span>Last Post: {item.post.lastPost} hours ago</span>
                        </div>

                        <hr className="border-gray-200 mt-3" />
                    </div>            
                </div>
                ))}
            </div>
            <Link to="/discussions" className="flex text-blue-600 hover:underline justify-center"> View All Discussions<ArrowRight className="w-5 h-6" /> </Link>
        </section>
    )
}