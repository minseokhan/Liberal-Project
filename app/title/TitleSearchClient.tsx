"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClassList from "../components/ClassList";
import Modal from "../components/Modal";
import TitleSearch from "../components/search/TitleSearch";
import { SafeLiberal } from "../types";
import useSWR from "swr";

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

  const { data: liberalInfo } = useSWR<SafeLiberal[]>("/api/liberal");

  const filteredLiberalInfo = liberalInfo?.filter((liberal) => {
    const korKeyword = liberal.name.includes(searchTitle || "");
    return korKeyword;
  });

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
        <ClassList
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

export default TitleSearchClient;
