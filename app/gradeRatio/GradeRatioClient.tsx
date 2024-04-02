"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClassList from "../components/ClassList";
import Modal from "../components/Modal";
import GradeSearch from "../components/search/GradeSearch";
import { SafeLiberal } from "../types";
import useSWR from "swr";

const GradeRatioClient = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [searchInfo, setSearchInfo] = useState({
    area: "",
    grade: "",
    percent: "",
  });
  const { area, grade, percent } = searchInfo;

  const verify =
    !(!area && !grade && !percent) && (!area || !grade || !percent);

  const { data: liberalInfo } = useSWR<SafeLiberal[]>("/api/liberal");

  const filteredLiberalInfo = liberalInfo?.filter((liberal) => {
    const newGradeArr = liberal.gradeArr.map((data, i) => {
      if (data.split("-")[2] === grade) return i;
    });
    if (!area && !grade && !percent) {
      return true;
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
    setSearchInfo(data);
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
    <div className="mx-72">
      <div className="relative w-full flex flex-col gap-6 justify-center items-center">
        <div
          onClick={() => router.push("/")}
          className="relative w-[250px] h-[120px] cursor-pointer mt-16"
        >
          <Image src="/images/logo.jpg" alt="img" fill sizes="100%" />
        </div>
        <GradeSearch onGradePercentSearch={onGradePercentSearch} />
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
