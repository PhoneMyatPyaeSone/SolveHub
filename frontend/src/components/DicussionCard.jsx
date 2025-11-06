export default function DiscussionCard({ discussion }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800">{discussion.title}</h2>
      <p className="text-gray-600 mt-2">{discussion.content}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {discussion.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="text-gray-400 text-sm mt-2">
        {discussion.views} views • {discussion.votes} votes
      </div>
    </div>
  );
}
