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
}

const GradeSearch: React.FC<GradeSearchProps> = ({ onGradePercentSearch }) => {
  const [data, setData] = useState({
    area: "",
    grade: "",
    percent: "",
  });

  const onClick = (key: string, value: string) => {
    const newData = {
      ...data,
      [key]: value,
    };
    setData(newData);
  };

  return (
    <div className="w-full flex flex-row justify-center items-center gap-3 py-4 border-t-[1px] border-b-[1px] border-blue1 mb-2">
      <div className="flex flex-row gap-4">
        <div className="relative w-52">
          <AreaSelect onClick={onClick} />
        </div>
        <div className="relative w-44">
          <GradeSelect onClick={onClick} />
        </div>
        <div className="relative w-56">
          <PercentSelect onClick={onClick} />
        </div>
        <Button
          dark={false}
          label="검색하기"
          onClick={() => onGradePercentSearch(data)}
          thin
        />
      </div>
    </div>
  );
};

export default GradeSearch;
