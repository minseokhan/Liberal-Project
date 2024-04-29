"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

const MainClient = () => {
  const router = useRouter();
  const [id, setId] = useState(0);
  const domain = "https://liberal-project.vercel.app";

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
  ];

  const onClickSchool = (id: number) => {
    setId(id);
  };

  const onClickAdmin = () => {
    router.push("/admin");
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-12 mb-28">
        <div className="relative w-[280px] h-[130px] sm:w-[330px] sm:h-[150px] md:w-[400px] md:h-[190px] lg:w-[550px] lg:h-[250px] cursor-pointer">
          <Image
            src={domain + "/Images/logo.jpg"}
            alt="img"
            fill
            sizes="100%"
          />
        </div>
        <div className="w-[350px] sm:w-auto flex flex-col gap-5 items-start sm:justify-center sm:items-center">
          <div className="w-full flex flex-col gap-2 mb-4">
            <p className="text-blue8 font-semibold text-xl">학교 선택하기</p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 sm:gap-3">
              {buttonInfo.map((data) => (
                <Button
                  key={data.id}
                  dark={false}
                  label={data.label}
                  onClick={() => onClickSchool(data.id)}
                  open={data.id === id}
                />
              ))}
              <Button
                key={7}
                dark={false}
                label="교양 등록하기"
                onClick={onClickAdmin}
                open={false}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex flex-col gap-2">
            <p className="text-blue8 font-semibold text-xl">
              검색 방법 선택하기
            </p>
            <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-3">
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
    </div>
  );
};

export default MainClient;
