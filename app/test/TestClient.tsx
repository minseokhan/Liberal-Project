"use client";

import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import useSWRInfinite from "swr/infinite";
import { usePagination } from "../hook/usePagination";
import { SafeLiberal } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import { LuLoader2 } from "react-icons/lu";

const TestClient = () => {
  const [page, setPage] = useState(1);
  const {
    paginatedLiberal,
    isReachedEnd,
    loadingMore,
    size,
    setSize,
    error,
    mutate,
  } = usePagination<SafeLiberal>("/api/test");

  console.log(paginatedLiberal);

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 xl:mx-40 xlhalf:mx-56 2xl:mx-72">
      <div className="relative w-full flex flex-col gap-6 justify-center items-center">
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lghalf:grid-cols-3 gap-x-3 gap-y-4 mb-12">
            {paginatedLiberal?.map((liberal) => (
              <ClassCard
                key={liberal.id}
                onModalOpen={() => {}}
                liberal={liberal}
              />
            ))}
          </div>
        </InfiniteScroll>
        {/* <button onClick={onNextBtn}>loading more</button> */}
      </div>
    </div>
  );
};

export default TestClient;
