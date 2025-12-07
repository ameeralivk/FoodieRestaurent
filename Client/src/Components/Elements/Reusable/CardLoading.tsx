const LoadingCard: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] w-80 p-6 rounded-lg border border-gray-800 flex-shrink-0 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-10 bg-gray-700 rounded w-1/2 mb-4"></div>
      <hr className="my-4 border-gray-800" />
      <ul className="space-y-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="h-4 bg-gray-700 rounded w-full"></li>
        ))}
      </ul>
      <div className="h-8 bg-gray-700 rounded w-full"></div>
    </div>
  );
};

export default LoadingCard