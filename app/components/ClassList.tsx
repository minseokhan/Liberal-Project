"use client";

import { SafeLiberal } from "../types";
import ClassCard from "./ClassCard";

interface ClassListProps {
  filteredLiberalInfo: SafeLiberal[] | undefined;
  onModalOpen: (id: string) => void;
}

const ClassList: React.FC<ClassListProps> = ({
  filteredLiberalInfo,
  onModalOpen,
}) => {
  return (
    <>
      {filteredLiberalInfo && filteredLiberalInfo?.length !== 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lghalf:grid-cols-3 gap-x-3 gap-y-4 mb-16">
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
          <div className="mt-8 sm:mt-40 px-10 py-4 bg-blue0 rounded-lg">
            <p className="text-lg text-blue6">
              해당 조건을 만족하는 교양 수업이 존재하지 않습니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassList;
