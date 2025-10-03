import Welcome from "../components/Welcome";
import PopularCategory from "../components/PopularCategory";
import ForumStatistics from "../components/ForumStatistics";

export default function Home() {
  return (
    <>
        <Welcome />

        <div className="bg-gray-100 p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                {/* PopularCategory: takes 2/3 on desktop, full width on mobile */}
                <div className="w-full md:col-span-2">
                <PopularCategory/>
                </div>

                {/* ForumStatistics: takes 1/3 on desktop, full width on mobile, height fits content */}
                <div className="w-full self-start">
                <ForumStatistics />
                </div>

            </div>
        </div>

    </>
  );
}
