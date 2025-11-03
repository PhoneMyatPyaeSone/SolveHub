import { FaFacebookF,FaTwitter, FaLinkedinIn, FaYoutube, FaPaperPlane } from "react-icons/fa";
import {ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return(
        <footer className="bg-gray-900 text-white py-8 px-6">

        {/* Top columns */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-0">
            <div className="text-base font-bold">Community Forum</div>
            <div className="text-sm text-gray-400">
                A place for meaningful discussions and knowledge sharing.
            </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Quick Links</div>
            <Link to="/" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Home
            </Link>
            <Link to="/blogs" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Forums
            </Link>
            <Link to="/members" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Members
            </Link>
            <Link to="/members" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Rules
            </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Categories</div>
            <Link to="/" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Technology
            </Link>
            <Link to="/blogs" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Health
            </Link>
            <Link to="/members" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Business
            </Link>
            <Link to="/members" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Culture
            </Link>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Connect With Us</div>
            <div className="flex flex-row gap-3 mt-1 text-gray-400">
                <FaFacebookF className="hover:text-blue-600 cursor-pointer" size={20} />
                <FaTwitter className="hover:text-blue-400 cursor-pointer" size={20} />
                <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" size={20} />
                <FaYoutube className="hover:text-red-600 cursor-pointer" size={20} />
            </div>
            <div className="text-base text-gray-400 my-2">Subscribe to our newsletter</div>
            <div className="flex w-full max-w-md">
                <input
                type="text"
                name="email"
                id="email"
                placeholder="Your email"
                className="flex-1 bg-white placeholder-black placeholder:text-sm p-2 rounded-l border border-gray-300 focus:outline-none"
                />
                <button className="bg-blue-500 p-3 rounded-r hover:bg-blue-600 flex items-center justify-center">
                <FaPaperPlane className="text-white" size={18} />
                </button>
            </div>
            </div>
        </div>

        {/* Horizontal line */}
        <hr className="border-gray-700 my-6" />

        {/* Footer bottom text */}
        <p className="text-center text-gray-400 text-sm">
            &copy;2025 Community Forum. All rights reserved.
        </p>
        </footer>
    )
}