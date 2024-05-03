"use client";

import { useState } from "react";
import Button from "../Button";
import PercentInput from "../input/PercentInput";

interface TitleSearchProps {
  onTitleSearch: (searchWord: string) => void;
  onResetSearch: () => void;
}

const TitleSearch: React.FC<TitleSearchProps> = ({
  onTitleSearch,
  onResetSearch,
}) => {
  const [title, setTitle] = useState("");

  const onReset = () => {
    setTitle("");
    onResetSearch();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div className="w-full flex flex-row justify-center items-center gap-3 py-4 border-t-[1px] border-b-[1px] border-blue1 mb-2">
      <div className="w-full flex flex-col lghalf:flex-row justify-center items-center gap-4">
        <div className="relative w-full md:w-80">
          <PercentInput
            id="name"
            onChange={onChange}
            placeholder="과목명을 입력해주세요..."
            type="text"
            value={title}
          />
        </div>
        <div className="flex w-full md:w-auto flex-col md:flex-row gap-2 md:gap-4">
          <Button
            dark={false}
            label="검색하기"
            onClick={() => onTitleSearch(title)}
            thin
          />
          <Button dark={true} label="검색 내용 초기화" onClick={onReset} thin />
        </div>
      </div>
    </div>
  );
};

export default TitleSearch;
