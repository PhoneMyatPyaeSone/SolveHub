import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, User, Calendar, Edit2, LogOut } from "lucide-react";
import api from "../api/axios";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    posts: 0,
    votes: 0,
    views: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.id) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.get("/users/statistics/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Find current user's stats
      const currentUserStats = response.data.find((m) => m.id === user.id);
      if (currentUserStats) {
        setUserStats({
          posts: currentUserStats.posts,
          votes: currentUserStats.votes,
          views: currentUserStats.views,
        });
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    alert("✅ Logged out successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (fullName) => {
    return fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "U";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Header Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 md:h-40"></div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 -mt-20 pb-10">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative z-10">
            {/* Top Section: Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              {/* Avatar */}
              <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl md:text-5xl font-bold flex-shrink-0">
                {getInitials(user.full_name)}
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {user.full_name}
                </h1>
                <p className="text-lg text-blue-600 font-semibold mb-3">
                  @{user.username}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-8" />

            {/* Stats Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Activity Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Posts */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm font-semibold text-orange-600 mb-2">
                    Total Posts
                  </p>
                  <p className="text-3xl font-bold text-orange-700">
                    {statsLoading ? "-" : userStats.posts}
                  </p>
                </div>

                {/* Votes */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-green-600 mb-2">
                    Total Votes
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {statsLoading ? "-" : userStats.votes}
                  </p>
                </div>

                {/* Views */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm font-semibold text-purple-600 mb-2">
                    Total Views
                  </p>
                  <p className="text-3xl font-bold text-purple-700">
                    {statsLoading ? "-" : userStats.views}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Details Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Account Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Username</p>
                    <p className="text-lg text-gray-900">{user.username}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                    <p className="text-lg text-gray-900">{user.email}</p>
                  </div>
                </div>

                {/* Full Name */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Full Name</p>
                    <p className="text-lg text-gray-900">{user.full_name}</p>
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Joined</p>
                    <p className="text-lg text-gray-900">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Security Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Security</h3>
              <p className="text-gray-600 text-sm mb-4">
                Your account is secure. You can change your password at any time.
              </p>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Change Password
              </button>
            </div>

            {/* Activity Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Activity</h3>
              <p className="text-gray-600 text-sm mb-4">
                View your recent discussions, posts, and interactions.
              </p>
              <button
                onClick={() => navigate("/discussions")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Discussions
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
