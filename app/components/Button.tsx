"use client";

interface ButtonProps {
  dark: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  open?: boolean;
  modal?: boolean;
  thin?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  dark,
  label,
  onClick,
  open,
  modal,
  thin,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-auto
        font-medium
        flex
        justify-center
        items-center 
        transition
        text-base
        leading-tight
        ${thin ? "py-2" : "py-4"}
        ${
          modal
            ? "border-[1px] border-blue6 bg-white text-sm hover:text-white hover:border-blue4 text-blue6 py-2 px-4"
            : " text-white px-6"
        }
        ${
          dark
            ? "bg-blue3 hover:bg-blue5"
            : open
            ? "bg-blue5"
            : "bg-blue2 hover:bg-blue4"
        }
        cursor-pointer
        rounded-lg
      `}
    >
      <span className="flex justify-center items-center">{label}</span>
    </button>
  );
};

export default Button;
