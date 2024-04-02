"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  return (
    <div className="mx-72">
      <div className="relative w-full flex flex-col gap-6 justify-center items-center">
        <div
          onClick={() => router.push("/")}
          className="relative w-[250px] h-[120px] cursor-pointer mt-16"
        >
          <Image src="/images/logo.jpg" alt="img" fill sizes="100%" />
        </div>
        <TitleSearch onTitleSearch={onTitleSearch} />
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
