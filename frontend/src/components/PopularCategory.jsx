import { Plus } from "lucide-react";
import { useState } from "react";

export default function PopularCategory() {
    const [topics, setTopics] = useState([
        { title: "Technology", posts: 12, topics: 5 },
        { title: "Health & Wellness", posts: 8, topics: 3 },
        { title: "Art & Culture", posts: 5, topics: 2 },
        { title: "Sport", posts: 20, topics: 10 },
    ])

    function addNewTopic(){
        setTopics(prevTopic => [...prevTopic, "New Topic"])

    }
    return(
        <section className="shadow-lg rounded-lg p-3 bg-white w-full">
            <div className="flex">
                <div className="text-xl font-bold text-gray-800">Popular Category</div>
                <div className="flex items-center ml-auto">
                    <button className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition" onClick={addNewTopic}>
                    <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-blue-600 ml-1 cursor-pointer">New Topic</span>
                </div>              
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 p-0">
                {
                    topics.map((topic, index) => {
                        return(
                            <div 
                            key={index} 
                            className="shadow-md p-2 border rounded text-gray-700"
                            >
                            <div className="font-semibold">{topic.title}</div>
                            <div className="flex justify-between text-sm text-gray-500 mt-1">                                
                                <span>{topic.topics} topics</span>
                                <span>{topic.posts} posts</span>
                            </div>
                            </div>
                        )
                    })
                }
            </div>

        </section>
    )
}