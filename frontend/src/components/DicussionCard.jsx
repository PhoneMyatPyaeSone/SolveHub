import { FaUser, FaArrowUp, FaArrowDown, FaRegComment, FaEye, FaClock } from "react-icons/fa";

export default function DiscussionCard() {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md">
      
      {/* Left Column: User profile + votes */}
      <div className="flex flex-col items-center gap-2">
        {/* Profile Icon */}
        <FaUser size={32} className="text-gray-500" />
        
        {/* Upvote */}
        <FaArrowUp className="text-gray-500 cursor-pointer hover:text-blue-500" />
        {/* Vote count */}
        <div className="text-sm font-bold">24</div>
        {/* Downvote */}
        <FaArrowDown className="text-gray-500 cursor-pointer hover:text-red-500" />
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-2">
        
        {/* Row 1: Categories */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">Technology</div>
          <div className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">Web Development</div>
        </div>

        {/* Row 2: Discussion title + content */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm">How to center a div in CSS?</h3>
          <p className="text-gray-600 text-sm">
            I’m trying to center a div horizontally and vertically inside its parent container. What’s the best way to do this using modern CSS?
          </p>
        </div>

        {/* Row 3: User info left, replies & views right */}
        <div className="flex justify-between items-center text-gray-500 text-xs mt-2">
          {/* Left: user + time */}
          <div className="flex items-center gap-2">
            <FaUser size={12} />
            <span>Alex Johnson</span>
            <FaClock size={12} className="ml-2" />
            <span>3 hours ago</span>
          </div>

          {/* Right: replies + views */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaRegComment size={12} /> 5
            </div>
            <div className="flex items-center gap-1">
              <FaEye size={12} /> 120
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
