import { Plus } from "lucide-react";
import { useState } from "react";

export default function PopularCategory() {
    const [topics, setTopics] = useState([])

    function addNewTopic(){
        setTopics(prevTopic => [...prevTopic, "New Topic"])

    }
    return(
        <section className="shadow-lg m-5 ">
            <div className="flex">
                <div className="text-xl font-bold text-gray-800">Popular Category</div>
                <div className="flex items-center ml-auto">
                    <button className="w-5 h-5 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition" onClick={addNewTopic}>
                    <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-blue-600 ml-1 cursor-pointer">New Topic</span>
                </div>              
            </div>

            <div className="mt-4 space-y-2">
                {
                    topics.map((topic, index) => {
                        return(
                            <div 
                            key={index} 
                            className="shadow-md p-2  border rounded text-gray-700"
                            >
                                {topic}
                            </div>
                        )
                    })
                }
            </div>

        </section>
    )
}