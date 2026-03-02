const Shimmer = () => {
  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md bg-white">

      <div className="flex justify-between items-start">
        <div className="h-6 w-40 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-4 w-2/3 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
      </div>
      <div className="flex gap-6 mt-4">
        <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-4 w-28 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        <div className="h-6 w-20 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-6 w-24 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
      </div>
      <div className="flex flex-wrap gap-6 mt-4">
        <div className="h-4 w-20 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
        <div className="h-4 w-20 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_2s_infinite_linear]"></div>
      </div>
    </div>
  );
};

export default Shimmer;
