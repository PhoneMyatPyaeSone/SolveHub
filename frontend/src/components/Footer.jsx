import { FaFacebookF,FaTwitter, FaLinkedinIn, FaYoutube, FaPaperPlane } from "react-icons/fa";
import {ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

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
            <Link to="/discussions" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Forums
            </Link>
            <Link to="/members" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Members
            </Link>
            <Link to="/blogs" className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                <ChevronRight size={16} /> Blogs
            </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-1">
            <div className="text-base font-bold">Categories</div>
            {/** Dynamic categories loaded from discussions */}
            {/** Render up to 6 categories */}
            <DynamicCategories />
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

function DynamicCategories(){
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchCats = async () => {
            try{
                setLoading(true);
                const res = await api.get('/discussions', { params: { skip:0, limit: 1000 } });
                const seen = new Set();
                const list = [];
                res.data.forEach(d => {
                    let c = d.category;
                    if (Array.isArray(c)) c = c[0];
                    if (!c) c = 'General';
                    if (!seen.has(c)){
                        seen.add(c);
                        list.push(c);
                    }
                });
                if(mounted) setCats(list.slice(0,6));
            }catch(err){
                console.error('Error fetching categories for footer', err);
                if(mounted) setCats([]);
            }finally{
                if(mounted) setLoading(false);
            }
        }
        fetchCats();
        return () => { mounted = false }
    },[])

    if(loading) return <div className="text-gray-400">Loading...</div>
    if(cats.length === 0) return <div className="text-gray-400">No categories</div>

    return (
        <>
            {cats.map((cat, idx) => (
                <Link key={idx} to={`/discussions?category=${encodeURIComponent(cat)}`} className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
                    <ChevronRight size={16} /> {cat}
                </Link>
            ))}
        </>
    )
}