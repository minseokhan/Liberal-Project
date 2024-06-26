"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/input/Input";
import PercentInput from "../components/input/PercentInput";
import AreaAdminSelect from "../components/select/AreaAdminSelect";
import { useRouter } from "next/navigation";
import AccessModal from "../components/AccessModal";

const AdminClient = () => {
  const router = useRouter();
  const defaultGradePercent = {
    "2023-2-A+": "",
    "2023-2-B+": "",
    "2023-1-A+": "",
    "2023-1-B+": "",
    "2022-2-A+": "",
    "2022-2-B+": "",
    "2022-1-A+": "",
    "2022-1-B+": "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [areaReset, setAreaReset] = useState(false);
  const [gradePercent, setGradePercent] = useState(defaultGradePercent);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      area: "",
      credit: null,
      everytimeLink: "",
      portfolioLink: "",
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextGradePercent = {
      ...gradePercent,
      [name]: value,
    };
    setGradePercent(nextGradePercent);
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let error: boolean = false;
    setIsLoading(true);

    Object.values(gradePercent).map((data) => {
      if (+data > 100) {
        error = true;
      }
    });

    if (error) {
      toast.error("100% 이상인 퍼센트가 나올 수 없습니다! 다시 작성해주세요!!");
      return;
    }

    const updateData = {
      ...data,
      gradeArr: Object.keys(gradePercent),
      percentArr: Object.values(gradePercent),
    };

    axios
      .post("/api/liberal", updateData)
      .then(() => {
        toast.success("교양 수업을 등록했습니다!!");
        reset();
        setAreaReset(true);
        setGradePercent(defaultGradePercent);
      })
      .catch((error) => {
        toast.error("교양 수업을 등록하는데 문제가 생겼습니다...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mx-[50px] sm:mx-[100px] md:mx-[150px] lg:mx-[200px] xl:mx-[350px] 2xl:mx-[500px]">
      <div className="relative w-full min-h-screen flex flex-col gap-6 justify-center items-center">
        <p className="text-blue7 font-semibold text-3xl text-center mb-5">
          교양 등록하기
        </p>

        <div className="w-full flex flex-col gap-1 justify-center">
          <p className="text-blue7 pl-2">교양 과목명</p>
          <Input
            id="name"
            register={register}
            disabled={isLoading}
            placeholder="교양 과목명을 입력해주세요..."
            type="text"
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">교양영역 선택</p>
            <AreaAdminSelect
              id="area"
              setValue={setValue}
              disabled={isLoading}
              areaReset={areaReset}
              reset={() => setAreaReset(false)}
            />
          </div>
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">학점</p>
            <Input
              id="credit"
              register={register}
              disabled={isLoading}
              placeholder="몇 학점 수업인지 입력해주세요..."
              type="number"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2023-2학기 A+</p>
            <PercentInput
              id="2023-2-A+"
              onChange={onChange}
              placeholder="2023-2학기 A+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2023-2-A+"]}
            />
          </div>
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2023-2학기 B+</p>
            <PercentInput
              id="2023-2-B+"
              onChange={onChange}
              placeholder="2023-2학기 B+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2023-2-B+"]}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2023-1학기 A+</p>
            <PercentInput
              id="2023-1-A+"
              onChange={onChange}
              placeholder="2023-1학기 A+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2023-1-A+"]}
            />
          </div>
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2023-1학기 B+</p>
            <PercentInput
              id="2023-1-B+"
              onChange={onChange}
              placeholder="2023-1학기 B+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2023-1-B+"]}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2022-2학기 A+</p>
            <PercentInput
              id="2022-2-A+"
              onChange={onChange}
              placeholder="2022-2학기 A+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2022-2-A+"]}
            />
          </div>
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2022-2학기 B+</p>
            <PercentInput
              id="2022-2-B+"
              onChange={onChange}
              placeholder="2022-2학기 B+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2022-2-B+"]}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2022-1학기 A+</p>
            <PercentInput
              id="2022-1-A+"
              onChange={onChange}
              placeholder="2022-1학기 A+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2022-1-A+"]}
            />
          </div>
          <div className="w-full flex flex-col gap-1 justify-center">
            <p className="text-blue7 pl-2">2022-1학기 B+</p>
            <PercentInput
              id="2022-1-B+"
              onChange={onChange}
              placeholder="2022-1학기 B+ 비율을 입력해주세요..."
              type="text"
              value={gradePercent["2022-1-B+"]}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 justify-center">
          <p className="text-blue7 pl-2">포트폴리오 링크</p>
          <Input
            id="portfolioLink"
            register={register}
            disabled={isLoading}
            placeholder="해당 수업의 포트폴리오 링크를 입력해주세요..."
            type="text"
          />
        </div>

        <div className="w-full flex flex-col gap-1 justify-center">
          <p className="text-blue7 pl-2">에브리타임 링크</p>
          <Input
            id="everytimeLink"
            register={register}
            disabled={isLoading}
            placeholder="해당 수업의 에브리타임 링크를 입력해주세요..."
            type="text"
          />
        </div>

        <div className="w-full flex flex-row gap-2 justify-end">
          <Button
            dark={false}
            label="메인페이지로 돌아가기"
            onClick={() => router.push("/")}
            thin
          />
          <Button
            dark={true}
            label="교양 등록하기"
            onClick={handleSubmit(onSubmit)}
            thin
          />
        </div>
      </div>
      {modalOpen && (
        <AccessModal modalOpen={modalOpen} onModalClose={onModalClose} />
      )}
    </div>
  );
};

export default AdminClient;
