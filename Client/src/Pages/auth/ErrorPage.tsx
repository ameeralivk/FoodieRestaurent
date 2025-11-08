import React from "react";

interface error {
  error: string | undefined;
}
const ErrorPage: React.FC<error> = ({ error }) => {
    
  return (
    <div className="text-center">
      <h1 className="text-8xl md:text-9xl font-black mb-8 
             text-transparent bg-clip-text 
             bg-[url('/pexels-felix-mittermeier-956981.jpg')] bg-cover bg-center">
        Oops!
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        404 - PAGE NOT FOUND
      </h2>

      <p className=" mb-8 max-w-md mx-auto">{error}</p>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
        GO TO HOMEPAGE
      </button>
    </div>
  );
};

export default ErrorPage;
