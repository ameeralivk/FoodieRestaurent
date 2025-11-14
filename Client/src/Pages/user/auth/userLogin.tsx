import React from "react";
import { useState } from "react";
import { validateLoginForm } from "../../../Validation/AdminRegistractiorValidation";
import AdminRegisterValidation from "../../../Validation/AdminRegistractiorValidation";
import ErrorPTag from "../../../Components/Elements/ErrorParagraph";
import type{FormData} from "../../../types/userTypes"
import WarningSwal from "../../../Components/Helpers/WarningSwal";
export default function UserLoginForm() {
     const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
      });
     const [error, setError] = useState<Partial<Record<keyof FormData, string>>>(
    {}
    );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
     const valid = validateLoginForm(formData);
     let len = Object.keys(valid.errors).length;
      if (len > 0) {
        for (let key in valid.errors) {
          const field = key as keyof FormData;
          setError((prev) => ({ ...prev, [field]: valid.errors[field] || "" }));
        }
        WarningSwal({ message: "Please File all the Field to Proceed" });
        return;
      }
    console.log('Login submitted');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const validation = AdminRegisterValidation(name as keyof FormData, value);
    setError((prev) => ({ ...prev, [name]: validation || "" }));
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Welcome back
        </h1>
        
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 rounded-lg shadow-sm space-y-6"
        >
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email or username
            </label>
            <input
              name="email"
              onChange={handleInputChange}
              id="email"
              type="text"
              placeholder="Enter your email or username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <ErrorPTag Text={error.email}/>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              onChange={handleInputChange}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <ErrorPTag Text={error.password}/>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md transition-colors"
          >
            Login
          </button>

          <div className="text-center space-y-2">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 block">
              New to DiseFood? Sign up
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 block">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
