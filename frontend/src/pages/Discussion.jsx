import { FaComments, FaHeartbeat, FaLaptopCode, FaChartLine, FaGraduationCap, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import DiscussionSearch from "../components/DiscussionSearch";
import DiscussionCard from "../components/DicussionCard"
import DiscussionForm from "../components/DiscussionForm";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";


export default function Discussions() {
    const [discussions, setDiscussions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [popularTags, setPopularTags] = useState([]);
    const [topContributors, setTopContributors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const [currentFilter, setCurrentFilter] = useState("latest");
    const { user, isAuthenticated } = useAuth();
    
    const ITEMS_PER_PAGE = 5;
    
    // Calculate total pages based on discussions length
    const totalPages = Math.ceil(discussions.length / ITEMS_PER_PAGE);
    
    useEffect(() => {
        if (searchQuery.trim()) {
            handleSearch(searchQuery);
        } else {
            fetchDiscussions();
        }
    }, [selectedCategory, searchQuery]);

    useEffect(() => {
        fetchPopularTags();
        fetchTopContributors();
    }, []);

    const fetchDiscussions = async () => {
        try {
            setLoading(true);
            setSearchMessage("");
            const response = await api.get("/discussions", {
                params: {
                    ...(selectedCategory ? { category: selectedCategory } : {}),
                    filter_by: currentFilter,
                    skip: 0,
                    limit: 1000
                },
            });
            setDiscussions(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) {
            fetchDiscussions();
            return;
        }

        try {
            setLoading(true);
            setSearchMessage("");
            const response = await api.get("/discussions/search", {
                params: {
                    query: query.trim(),
                    skip: 0,
                    limit: 1000
                },
            });
            
            if (response.data.length === 0) {
                setSearchMessage(`No discussions found matching "${query}"`);
                setDiscussions([]);
            } else {
                setDiscussions(response.data);
                setSearchMessage("");
            }
            setCurrentPage(1);
        } catch (error) {
            console.error("Error searching discussions:", error);
            setSearchMessage("Error searching discussions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularTags = async () => {
        try {
            const response = await api.get("/discussions/stats/popular-tags", {
                params: { limit: 6 }
            });
            setPopularTags(response.data);
        } catch (error) {
            console.error("Error fetching popular tags:", error);
        }
    };

    const fetchTopContributors = async () => {
        try {
            const response = await api.get("/discussions/stats/top-contributors", {
                params: { limit: 3 }
            });
            setTopContributors(response.data);
        } catch (error) {
            console.error("Error fetching top contributors:", error);
        }
    };

    const categories = [
        { label: "All Discussions", value: "" },
        { label: "General Discussions", value: "General" },
        { label: "Technology", value: "Technology" },
        { label: "Education", value: "Education" },
        { label: "Health & Wellness", value: "Health" },
        { label: "Business", value: "Business" },
    ];

    const categoryIcons = {
        "": <FaComments />,
        General: <FaComments />,
        Technology: <FaLaptopCode />,
        Education: <FaGraduationCap />,
        Health: <FaHeartbeat />,
        Business: <FaChartLine />,
    };

    const handleNewDiscussion = () => {
        setShowForm((prev) => !prev);   
    };

    const handleDiscussionCreated = (newDiscussion) => {
        if (!newDiscussion.user_id && user) {
            newDiscussion.user_id = user.id;
            newDiscussion.user_name = user.name;
        }
        setDiscussions([newDiscussion, ...discussions]);
        setShowForm(false);
        setCurrentPage(1);
        fetchPopularTags();
        fetchTopContributors();
    };

    const handleDiscussionUpdated = (updatedDiscussion) => {
        setDiscussions(discussions.map(d => 
            d.id === updatedDiscussion.id ? updatedDiscussion : d
        ));
    };

    const handleDiscussionDeleted = (id) => {
        const newDiscussions = discussions.filter((d) => d.id !== id);
        setDiscussions(newDiscussions);
        
        const newTotalPages = Math.ceil(newDiscussions.length / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
        
        fetchPopularTags();
        fetchTopContributors();
    };

    const handleCancelForm = () => {
        setShowForm(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);
            
            if (currentPage <= 3) {
                end = Math.min(maxPagesToShow, totalPages);
                start = 1;
            } 
            else if (currentPage >= totalPages - 2) {
                start = Math.max(1, totalPages - maxPagesToShow + 1);
                end = totalPages;
            }
            
            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push('...');
                }
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const paginatedDiscussions = discussions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <section className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left column */}
                <div className="md:w-1/4 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
                    <div className="text-lg font-bold text-gray-600">Category</div>

                    {categories.map((cat) => (
                        <div
                            key={cat.value}
                            className={`p-2 text-gray-500 flex items-center gap-2 hover:bg-blue-100 rounded cursor-pointer ${
                                selectedCategory === cat.value ? "bg-blue-200 text-blue-800 font-semibold" : ""
                            }`}
                            onClick={() => {
                                setSelectedCategory(cat.value);
                                setCurrentPage(1);
                                setSearchQuery(""); // Clear search when changing category
                            }}
                        >
                            {categoryIcons[cat.value] || <FaComments />} {cat.label}
                        </div>
                    ))}

                    <div className="text-lg font-bold text-gray-600 mt-3">Popular Tags</div>

                    <div className="flex flex-wrap gap-2">
                        {popularTags.length > 0 ? (
                            popularTags.map((tagData, index) => (
                                <div 
                                    key={index} 
                                    className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm cursor-pointer hover:bg-gray-400 transition"
                                    title={`${tagData.count} discussions`}
                                >
                                    #{tagData.tag}
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400 text-sm">No tags yet</div>
                        )}
                    </div>

                    <div className="text-lg font-bold text-gray-600 mt-3">Top Contributors</div>
                    
                    <div className="flex flex-col gap-2">
                        {topContributors.length > 0 ? (
                            topContributors.map((contributor) => (
                                <div key={contributor.user_id} className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <FaUser size={16} /> {contributor.name}
                                    </div>
                                    <div className="ml-5 text-gray-500 text-sm">
                                        {contributor.post_count} {contributor.post_count === 1 ? 'post' : 'posts'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400 text-sm">No contributors yet</div>
                        )}
                    </div>
                </div>

                {/* Right blocks horizontally stacked */}
                <div className="md:w-3/4 flex flex-col gap-4">
                    <DiscussionSearch 
                        onSearch={setSearchQuery}
                        onNewDiscussionClick={handleNewDiscussion}
                        searchQuery={searchQuery}
                        onFilterChange={(filter) => {
                            setCurrentFilter(filter);
                            setCurrentPage(1);
                        }}
                        currentFilter={currentFilter}
                    />
                    
                    {showForm && (
                        <DiscussionForm 
                            onCreated={handleDiscussionCreated} 
                            onCancel={handleCancelForm}
                        />
                    )}
                    
                    {loading ? (
                        <div className="text-center text-gray-500 py-8">Loading discussions...</div>
                    ) : searchMessage ? (
                        <div className="text-center text-gray-500 py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                            {searchMessage}
                        </div>
                    ) : discussions.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">No discussions found.</div>
                    ) : (
                        <>
                            {searchQuery && (
                                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                                    Found {discussions.length} result{discussions.length !== 1 ? 's' : ''} for "{searchQuery}"
                                </div>
                            )}
                            
                            {paginatedDiscussions.map((discussion) => (
                                <DiscussionCard 
                                    key={discussion.id} 
                                    discussion={discussion} 
                                    onDeleted={handleDiscussionDeleted} 
                                    onUpdated={handleDiscussionUpdated}
                                />
                            ))}
                            
                            {totalPages > 0 && (
                                <div className="text-center text-gray-500 text-sm">
                                    Page {currentPage} of {totalPages}
                                </div>
                            )}
                        </>
                    )}
                    
                    {/* Pagination */}
                    {!loading && discussions.length > 0 && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded transition ${
                                    currentPage === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-black hover:bg-blue-500 hover:text-white'
                                }`}
                            >
                                &#60;
                            </button>

                            {getPageNumbers().map((page, index) => (
                                page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded transition ${
                                            currentPage === page
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-black hover:bg-blue-500 hover:text-white'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )
                            ))}

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage >= totalPages}
                                className={`px-3 py-1 rounded transition ${
                                    currentPage >= totalPages
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-black hover:bg-blue-500 hover:text-white'
                                }`}
                            >
                                &#62;
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}