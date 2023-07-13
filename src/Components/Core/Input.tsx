import React, { InputHTMLAttributes, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "sm" | "lg";
}
const Input = ({ onChange, type, ...others }: InputProps) => {
  const [show, setShow] = useState(false);
  return type !== "password" ? (
    <input
      className="flex-1  bg-gray-50 p-3  rounded focus-within:outline-none w-full border"
      {...others}
      onChange={onChange}
    />
  ) : (
    <div className="flex flex-row bg-gray-50 border rounded items-center pr-4">
      <input
        className="flex-1  bg-gray-50 p-3  rounded focus-within:outline-none "
        {...others}
        type={show ? "text" : "password"}
        onChange={onChange}
      />
      <div>
        {!show ? (
          <BsEyeFill
            className="cursor-pointer"
            onClick={() => setShow(!show)}
          />
        ) : (
          <BsEyeSlashFill
            className="cursor-pointer"
            onClick={() => setShow(!show)}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
