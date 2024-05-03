"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClassList from "../components/ClassList";
import Modal from "../components/Modal";
import TitleSearch from "../components/search/TitleSearch";
import { SafeLiberal } from "../types";
import useSWR from "swr";
import InfiniteScroll from "react-infinite-scroll-component";
import { LuLoader2 } from "react-icons/lu";
import { usePagination } from "../hook/usePagination";

const TitleSearchClient = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const domain = "https://liberal-project.vercel.app";

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  const { paginatedLiberal, isReachedEnd, size, setSize } =
    usePagination<SafeLiberal>(
      `/api/search?search=${encodeURIComponent(searchTitle)}&`
    );

  const onTitleSearch = (searchWord: string) => {
    setSearchTitle(searchWord);
  };

  const onModalOpen = (id: string) => {
    setId(id);
    setModalOpen(!modalOpen);
  };

  const onModalClose = () => {
    setId("");
    setModalOpen(false);
  };

  const onResetSearch = () => {
    setSearchTitle("");
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
        <TitleSearch
          onTitleSearch={onTitleSearch}
          onResetSearch={onResetSearch}
        />
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachedEnd}
          loader={
            <div className="w-full flex justify-center mb-12">
              <LuLoader2 size={30} className="text-blue6 animate-spin" />
            </div>
          }
          dataLength={paginatedLiberal?.length ?? 0}
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

export default TitleSearchClient;
