import { FaSearch, FaPlus } from "react-icons/fa";

export default function DiscussionSearch({ onNewDiscussionClick }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
        {/* Search Bar */}
        <div className="flex flex-1 items-center bg-white border border-gray-300 rounded px-2">
          <FaSearch className="text-gray-400 mr-2" size={14} />
          <input
            type="text"
            placeholder="Search discussions"
            className="flex-1 p-2 text-sm placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {["Latest", "Popular", "Unanswered"].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 rounded bg-gray-200 text-black text-sm hover:bg-blue-500 hover:text-white transition w-auto"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tags + New Discussion */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {["#web development", "#UI design", "#React"].map((tag) => (
            <div
              key={tag}
              className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* New Discussion Button */}
        <div className="mt-2 md:mt-0">
          <button 
            onClick={onNewDiscussionClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm w-auto"
          >
            <FaPlus size={12} /> New Discussion
          </button>
        </div>
      </div>
    </div>
  );
}
