"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  type,
  register,
  disabled,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        {...register(id, { required: true })}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className="
          relative
          w-full
          rounded-md
          bg-white
          py-2
          pl-3
          pr-10
          text-left
          text-blue7
          shadow-sm
          ring-1
          ring-inset
          ring-blue3
          focus:outline-none
          focus:ring-2
          focus:ring-blue3
          sm:text-sm
          sm:leading-6
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
};

export default Input;
