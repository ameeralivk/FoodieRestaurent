import React from "react";
interface ButtonProps {
  text: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#EDAB12] h-10 w-[180px] rounded-md font-bold cursor-pointer hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {text}
    </button>
  );
};

export default Button;
