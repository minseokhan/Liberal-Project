"use client";

import { useState } from "react";
import Button from "../Button";
import AreaSelect from "../select/AreaSelect";
import GradeSelect from "../select/GradeSelect";
import PercentSelect from "../select/PercentSelect";

interface GradeSearchProps {
  onGradePercentSearch: (data: {
    area: string;
    grade: string;
    percent: string;
  }) => void;
  onReset: () => void;
}

const GradeSearch: React.FC<GradeSearchProps> = ({
  onGradePercentSearch,
  onReset,
}) => {
  const defaultData = {
    area: "교양 영역",
    grade: "학점 등급",
    percent: "해당 등급 퍼센트 정도",
  };
  const [data, setData] = useState(defaultData);

  const onClick = (key: string, value: string) => {
    const newData = {
      ...data,
      [key]: value,
    };
    setData(newData);
  };

  const onAllReset = () => {
    onReset();
    setData(defaultData);
  };

  return (
    <div className="w-full flex flex-row justify-center items-center gap-3 py-4 border-t-[1px] border-b-[1px] border-blue1 mb-2">
      <div className="relative w-full flex flex-col lghalf:flex-row justify-center items-center gap-4">
        <div className="relative w-full md:w-auto flex flex-col md:flex-row justify-center gap-2 md:gap-4">
          <div className="relative w-full md:w-52">
            <AreaSelect onClick={onClick} area={data.area} />
          </div>
          <div className="relative w-full md:w-44">
            <GradeSelect onClick={onClick} grade={data.grade} />
          </div>
          <div className="relative w-full md:w-56">
            <PercentSelect onClick={onClick} percent={data.percent} />
          </div>
        </div>

        <div className="flex w-full md:w-auto flex-col md:flex-row gap-2 md:gap-4">
          <Button
            dark={false}
            label="검색하기"
            onClick={() => onGradePercentSearch(data)}
            thin
          />
          <Button
            dark={true}
            label="검색 조건 초기화"
            onClick={onAllReset}
            thin
          />
        </div>
      </div>
    </div>
  );
};

export default GradeSearch;
