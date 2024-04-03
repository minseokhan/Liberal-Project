"use client";

interface InputProps {
  id: string;
  placeholder: string;
  type: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const PercentInput: React.FC<InputProps> = ({
  id,
  placeholder,
  type,
  disabled,
  onChange,
  value,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
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

export default PercentInput;
