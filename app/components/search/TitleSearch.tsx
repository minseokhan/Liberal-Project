"use client";

import { useState } from "react";
import Button from "../Button";
import PercentInput from "../input/PercentInput";

interface TitleSearchProps {
  onTitleSearch: (searchWord: string) => void;
}

const TitleSearch: React.FC<TitleSearchProps> = ({ onTitleSearch }) => {
  const [title, setTitle] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div className="w-full flex flex-row justify-center items-center gap-3 py-4 border-t-[1px] border-b-[1px] border-blue1 mb-2">
      <div className="flex flex-row gap-4">
        <div className="w-80 relative">
          <PercentInput
            id="name"
            onChange={onChange}
            placeholder="과목명을 입력해주세요..."
            type="text"
          />
        </div>
        <Button
          dark={false}
          label="검색하기"
          onClick={() => onTitleSearch(title)}
          thin
        />
      </div>
    </div>
  );
};

export default TitleSearch;
