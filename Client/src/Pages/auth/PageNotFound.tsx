import { Home } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className=" from-slate-800  to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* 404 Title */}
          <div className="text-center mb-8">
            <h1 className="text-8xl font-bold text-yellow-500 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-400 text-lg">
              Oops! The page you're looking for doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              onClick={() => console.log("Go to Home")}
            >
              <Home className="w-5 h-5" />
              Go to Home
            </button>

            <button
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 border border-slate-600"
              onClick={() => console.log("Go Back")}
            >
              Go Back
            </button>
          </div>

          {/* Additional Help Text */}
          <div className="mt-6 text-center">
            <p className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer transition duration-300">
              Need help? Contact Support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
