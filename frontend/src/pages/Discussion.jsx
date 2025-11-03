import { FaComments, FaHeartbeat, FaLaptopCode, FaChartLine, FaGraduationCap, FaUser } from "react-icons/fa";
import DiscussionSearch from "../components/DiscussionSearch";
import DiscussionCard from "../components/DicussionCard";

export default function Discussions() {
  return (
    <section className="p-4">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Left column */}
        <div className="md:w-1/4 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-bold text-gray-600">Category</div>

            <div className="p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer">
                <FaComments /> General Discussions
            </div>

            <div className="p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer">
                <FaLaptopCode /> Technology
            </div>

            <div className="p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer">
                <FaGraduationCap /> Education
            </div>

            <div className="p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer">
                <FaHeartbeat /> Health & Wellness
            </div>

            <div className="p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer">
                <FaChartLine /> Business
            </div>

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
            <DiscussionSearch />
            <DiscussionCard />
            <DiscussionCard />
            <DiscussionCard />

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
