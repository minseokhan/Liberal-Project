"use client";

import DonutChart from "./DonutChart";
import { IoIosArrowForward } from "react-icons/io";
import { SafeLiberal } from "../types";

interface ClassCardProps {
  onModalOpen: (id: string) => void;
  liberal: SafeLiberal;
}

const ClassCard: React.FC<ClassCardProps> = ({ onModalOpen, liberal }) => {
  return (
    <div className="w-full relative flex flex-col gap-2 border-[1px] border-blue4 rounded-lg py-3 px-4">
      <div className="flex justify-between items-end border-b-[1px] border-blue1 pb-1 px-1">
        <p className="text-blue8 text-lg font-semibold">{liberal.name}</p>
        <p className="text-blue5 text-base">{liberal.credit}학점</p>
      </div>
      <p className="text-blue7 text-base font-semibold px-1">
        영역: <span className="text-blue6 font-normal">{liberal.area}</span>
      </p>
      <div className="w-full flex flex-row justify-center items-center gap-5 mt-3 border-b-[1px] border-blue1 pb-2">
        <p className="text-blue8 text-base font-semibold mb-5">
          {liberal.gradeArr[0].split("-")[0] +
            "-" +
            liberal.gradeArr[0].split("-")[1] +
            "학기"}
        </p>
        <DonutChart deg={+liberal.percentArr[0]} color="#8EACCD" grade="A+" />
        <DonutChart deg={+liberal.percentArr[1]} color="#8EACCD" grade="B+" />
      </div>
      <div
        onClick={() => onModalOpen(liberal.id)}
        className="flex flex-row gap-1 justify-end items-center mt-1 mr-1 cursor-pointer"
      >
        <p className="text-blue6 text-sm">자세히 보기</p>
        <IoIosArrowForward size={17} className="text-blue6" />
      </div>
    </div>
  );
};

export default ClassCard;
