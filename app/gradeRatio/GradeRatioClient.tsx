"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClassList from "../components/ClassList";
import Modal from "../components/Modal";
import GradeSearch from "../components/search/GradeSearch";
import { SafeLiberal } from "../types";
import useSWR from "swr";

const GradeRatioClient = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const defaultData = {
    area: "",
    grade: "",
    percent: "",
  };
  const [searchInfo, setSearchInfo] = useState(defaultData);
  const { area, grade, percent } = searchInfo;
  const domain = "https://liberal-project.vercel.app";

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  const verify =
    (area && grade && !percent) || (area && !grade && percent) ? true : false;

  const { data: liberalInfo } = useSWR<SafeLiberal[]>("/api/liberal");

  const filteredLiberalInfo = liberalInfo?.filter((liberal) => {
    const newGradeArr = liberal.gradeArr.map((data, i) => {
      if (data.split("-")[2] === grade) return i;
    });
    if (!area && !grade && !percent) {
      return true;
    } else if (area && !grade && !percent) {
      const korKeyword = liberal.area === area;
      return korKeyword;
    } else if (!area && grade && percent) {
      const korKeyword = newGradeArr.find(
        (index) =>
          index &&
          (+percent === 0
            ? +liberal.percentArr[index] >= +percent &&
              +liberal.percentArr[index] < 10
            : +liberal.percentArr[index] >= +percent)
      );
      return korKeyword;
    } else if (area && grade && percent) {
      const korKeyword =
        liberal.area === area &&
        newGradeArr.find(
          (index) =>
            index &&
            (+percent === 0
              ? +liberal.percentArr[index] >= +percent &&
                +liberal.percentArr[index] < 10
              : +liberal.percentArr[index] >= +percent)
        );
      return korKeyword;
    } else {
      return false;
    }
  });

  const onGradePercentSearch = (data: {
    area: string;
    grade: string;
    percent: string;
  }) => {
    let newData = data;
    if (data.area === "교양 영역") {
      newData = { ...newData, area: "" };
    }
    if (data.grade === "학점 등급") {
      newData = { ...newData, grade: "" };
    }
    if (data.percent === "해당 등급 퍼센트 정도") {
      newData = { ...newData, percent: "" };
    }
    console.log(newData);
    setSearchInfo(newData);
  };

  const onModalOpen = (id: string) => {
    setId(id);
    setModalOpen(!modalOpen);
  };

  const onModalClose = () => {
    setId("");
    setModalOpen(false);
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 xl:mx-40 xlhalf:mx-56 2xl:mx-72">
      <div className="relative w-full flex flex-col gap-6 justify-center items-center">
        <div
          onClick={() => router.push("/")}
          className="relative w-[250px] h-[120px] cursor-pointer mt-8 sm:mt-16"
        >
          <Image
            src={domain + "/Images/logo.jpg"}
            alt="img"
            fill
            sizes="100%"
          />
        </div>
        <GradeSearch
          onGradePercentSearch={onGradePercentSearch}
          onReset={() => setSearchInfo(defaultData)}
        />
        <ClassList
          verify={verify}
          filteredLiberalInfo={filteredLiberalInfo}
          onModalOpen={onModalOpen}
        />
      </div>

      {modalOpen && (
        <Modal
          liberalInfo={filteredLiberalInfo?.find((data) => data.id === id)}
          modalOpen={modalOpen}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};

export default GradeRatioClient;
