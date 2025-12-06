import { FourSquare } from "react-loading-indicators";

const AppLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <FourSquare color="#32cd32" size="medium" text="" textColor="" />

      <h1 className="mt-4 text-2xl font-semibold text-blue-600 tracking-wide">
        FoodieRestarent
      </h1>
    </div>
  );
};

export default AppLoader;
