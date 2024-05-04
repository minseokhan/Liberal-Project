"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClassList from "../components/ClassList";
import Modal from "../components/Modal";
import GradeSearch from "../components/search/GradeSearch";
import { SafeLiberal } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePagination } from "../hook/usePagination";
import { LuLoader2 } from "react-icons/lu";
import { AreaArr, GradeArr, PercentArr } from "../data";
import toast from "react-hot-toast";

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

  const { paginatedLiberal, isReachedEnd, size, loadingMore, setSize } =
    usePagination<SafeLiberal>(
      `/api/liberal?area=${AreaArr.find((o) => o.area === area)?.id}&grade=${
        GradeArr.find((o) => o.grade === grade)?.id
      }&percent=${PercentArr.find((o) => o.percent === percent)?.id}&`
    );

  const onGradePercentSearch = (data: {
    area: string;
    grade: string;
    percent: string;
  }) => {
    if (
      (data.grade === "학점 등급" &&
        data.percent !== "해당 등급 퍼센트 정도") ||
      (data.grade !== "학점 등급" && data.percent === "해당 등급 퍼센트 정도")
    ) {
      toast.error(
        "학점 등급과 해당 등급의 퍼센트 정도는 모두 선택 후 검색하세요!"
      );
    } else {
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
      setSearchInfo(newData);
    }
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
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={
            loadingMore && (
              <div className="w-full flex justify-center mb-12">
                <LuLoader2 size={30} className="text-blue6 animate-spin" />
              </div>
            )
          }
          dataLength={paginatedLiberal?.length ?? 0}
          className="w-full"
        >
          <ClassList
            filteredLiberalInfo={paginatedLiberal}
            onModalOpen={onModalOpen}
          />
        </InfiniteScroll>
      </div>

      {modalOpen && (
        <Modal
          liberalInfo={paginatedLiberal?.find((data) => data.id === id)}
          modalOpen={modalOpen}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};

export default GradeRatioClient;
