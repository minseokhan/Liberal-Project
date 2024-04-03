"use client";

import { SafeLiberal } from "../types";
import ClassCard from "./ClassCard";

interface ClassListProps {
  verify?: boolean;
  filteredLiberalInfo: SafeLiberal[] | undefined;
  onModalOpen: (id: string) => void;
}

const ClassList: React.FC<ClassListProps> = ({
  verify,
  filteredLiberalInfo,
  onModalOpen,
}) => {
  return (
    <>
      {filteredLiberalInfo && filteredLiberalInfo?.length !== 0 ? (
        <div className="w-full grid grid-cols-3 gap-x-3 gap-y-4">
          {filteredLiberalInfo.map((liberal) => (
            <ClassCard
              key={liberal.id}
              onModalOpen={onModalOpen}
              liberal={liberal}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className="mt-40 px-10 py-4 bg-blue0 rounded-lg">
            <p className="text-lg text-blue6">
              {verify
                ? "학점 등급과 해당 등급의 퍼센트 정도는 모두 선택 후 검색하세요!"
                : "해당 조건을 만족하는 교양 수업이 존재하지 않습니다."}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassList;
