
import React from 'react'
interface Name{
    Name:String,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}
const InputField:React.FC<Name> = ({Name,onChange}) => {
  return (
     <div className="flex flex-col text-left">
              <label className="mb-1 text-sm font-medium">
                {Name}
              </label>
              <input
                onChange={onChange}
                type="text"
                placeholder={`Enter Your ${Name}`}
                className="border border-amber-400/50 bg-transparent rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>
  )
}

export default InputField