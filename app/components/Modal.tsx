"use client";

import Button from "./Button";
import DonutChart from "./DonutChart";
import { AiOutlineClose } from "react-icons/ai";
import { SafeLiberal } from "../types";

interface ReviewModalProps {
  modalOpen: boolean;
  onModalClose: () => void;
  liberalInfo: SafeLiberal | undefined;
}

const Modal: React.FC<ReviewModalProps> = ({
  modalOpen,
  onModalClose,
  liberalInfo,
}) => {
  let newGradeArr: string[] = [];

  if (!liberalInfo) return null;

  liberalInfo.gradeArr.map((grade, i) => {
    const gradeHead = grade.split("-")[0] + "-" + grade.split("-")[1];
    if (!newGradeArr.includes(gradeHead)) {
      newGradeArr.push(gradeHead);
    }
  });

  return (
    <div className="justify-center sm:items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/90">
      <div className="relative w-full md:w-4/6 lg:w-3/5 xl:w-2/5 mx-auto">
        <div
          className={`
              translate
              duration-300
              relative
              ${modalOpen ? "translate-y-0" : "translate-y-full"}
              ${modalOpen ? "opacity-100" : "opacity-0"}
            `}
        >
          <div className="relative w-full bg-white flex flex-col gap-2 rounded-md px-5 py-5">
            <div className="flex justify-between gap-2 items-end border-b-[1px] border-blue1 pb-2 px-1">
              <div className="text-blue8 text-xl font-semibold">
                <span className="pr-2">{liberalInfo.name}</span>
                <span className="text-blue5 text-lg inline-block">
                  ({liberalInfo.credit}학점)
                </span>
              </div>
              <AiOutlineClose
                size={25}
                onClick={onModalClose}
                className="text-blue6 mb-1 cursor-pointer"
              />
            </div>
            <p className="text-blue7 text-lg font-semibold px-1">
              영역:{" "}
              <span className="text-blue6 text-lg font-normal">
                {liberalInfo.area}
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 [&>*:nth-child(2)]:border-b-[0.5px] [&>*:nth-child(3)]:border-t-[0.5px]">
              {newGradeArr.map((grade, i) => (
                <div
                  key={i}
                  className="w-full flex flex-col justify-center items-center gap-3 py-2 border-blue1 sm:odd:border-r-[0.5px] first:border-b-[1px] sm:first:border-b-[0.5px] sm:even:border-l-[0.5px] last:border-t-[1px] sm:last:border-t-[0.5px]"
                >
                  <p className="text-blue8 text-base font-semibold">
                    {grade}학기
                  </p>
                  <div className="flex flex-row gap-8 sm:gap-6 lg:gap-7 xl:gap-4">
                    <DonutChart
                      deg={liberalInfo.percentArr[i * 2]}
                      color="#8EACCD"
                      grade="A+"
                    />
                    <DonutChart
                      deg={liberalInfo.percentArr[i * 2 + 1]}
                      color="#8EACCD"
                      grade="B+"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-2 justify-end items-center border-t-[1px] border-blue1 mt-1 mr-1 pt-3 cursor-pointer">
              <Button
                label="에브리타임 바로가기"
                onClick={() => window.open(liberalInfo.everytimeLink)}
                dark={false}
                modal={true}
              />
              <Button
                label="포트폴리오 바로가기"
                onClick={() => window.open(liberalInfo.portfolioLink)}
                dark={false}
                modal={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
