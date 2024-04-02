"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

const MainClient = () => {
  const router = useRouter();
  const [id, setId] = useState(0);

  const buttonInfo = [
    {
      id: 1,
      label: "한양대학교",
    },
    {
      id: 2,
      label: "서울대학교",
    },
    {
      id: 3,
      label: "연세대학교",
    },
    {
      id: 4,
      label: "고려대학교",
    },
  ];

  const onClickSchool = (id: number) => {
    setId(id);
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 mb-28">
        <div className="relative w-[580px] h-[260px] cursor-pointer">
          <Image
            src={process.env.PUBLIC_URL + "/images/logo.jpg"}
            alt="img"
            fill
            sizes="100%"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-blue8 font-semibold text-xl">학교 선택하기</p>
          <div className="flex flex-row gap-4">
            {buttonInfo.map((data) => (
              <Button
                key={data.id}
                dark={false}
                label={data.label}
                onClick={() => onClickSchool(data.id)}
                open={data.id === id}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-blue8 font-semibold text-xl">검색 방법 선택하기</p>
          <div className="flex flex-row gap-4">
            <Button
              dark
              label="과목명으로 검색하기"
              onClick={() => router.push("/title")}
            />
            <Button
              dark
              label="학점 비율로 검색하기"
              onClick={() => router.push("/gradeRatio")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainClient;
