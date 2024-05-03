"use client";

import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

interface AreaSelectProps {
  onClick: (key: string, value: string) => void;
  area: string;
}

const AreaSelect: React.FC<AreaSelectProps> = ({ onClick, area }) => {
  const [areaOpen, setAreaOpen] = useState(false);
  const AreaArr = [
    "고전읽기영역",
    "글로벌언어와문화영역",
    "소프트웨어영역",
    "미래산업과창업영역",
    "과학과기술영역",
    "인문과예술영역",
    "사회와세계영역",
    "가상대학영역",
  ];

  const onAreaOpen = () => {
    setAreaOpen(!areaOpen);
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
            {area}
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

      {areaOpen && (
        <ul
          className="absolute mt-1 z-50 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-99"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {AreaArr.map((data, _) => (
            <li
              key={_}
              onClick={() => {
                onClick("area", data), setAreaOpen(false);
              }}
              className={`relative cursor-default select-none ${
                area === data ? "bg-blue0" : "bg-white"
              } hover:bg-blue0 py-2 pl-3 pr-9`}
              id="listbox-option-0"
              role="option"
            >
              <div className="flex items-center">
                <span className="font-normal ml-3 block truncate text-base text-blue6">
                  {data}
                </span>
              </div>

              {area === data && (
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

export default AreaSelect;
