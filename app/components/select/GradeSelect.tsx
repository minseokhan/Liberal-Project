"use client";

import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

interface GradeSelectProps {
  onClick: (key: string, value: string) => void;
  grade: string;
}

const GradeSelect: React.FC<GradeSelectProps> = ({ onClick, grade }) => {
  const [gradeOpen, setGradeOpen] = useState(false);
  const GradeArr = ["A+", "B+"];

  const onAreaOpen = () => {
    setGradeOpen(!gradeOpen);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-blue3 focus:outline-none focus:ring-2 focus:ring-blue3 sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={onAreaOpen}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate text-base text-blue7">
            {grade}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {gradeOpen && (
        <ul
          className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-99"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {GradeArr.map((data, _) => (
            <li
              key={_}
              onClick={() => {
                onClick("grade", data), setGradeOpen(false);
              }}
              className={`relative cursor-default select-none ${
                grade === data ? "bg-blue0" : "bg-white"
              } hover:bg-blue0 py-2 pl-3 pr-9`}
              id="listbox-option-0"
              role="option"
            >
              <div className="flex items-center">
                <span className="font-normal ml-3 block truncate text-base text-blue6">
                  {data}
                </span>
              </div>

              {grade === data && (
                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                  <IoCheckmark size={18} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GradeSelect;
