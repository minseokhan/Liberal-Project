import useSWRInfinite from "swr/infinite";

export const usePagination = <T>(url: string) => {
  const PAGE_SIZE = 12;

  const getKey = (pageIndex: number, previousPageData: T[]) => {
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.length) return null;
    return `${url}page=${pageIndex}&limit=${PAGE_SIZE}`;
  };

  const {
    data: liberals,
    size,
    setSize,
    error,
    mutate,
  } = useSWRInfinite(getKey);

  const paginatedDate: T[] | undefined = liberals?.flat();
  const isReachedEnd =
    liberals && liberals[liberals.length - 1]?.length < liberals.length;
  const loadingMore = liberals && typeof liberals[size - 1] === "undefined";

  return {
    paginatedLiberal: paginatedDate,
    isReachedEnd,
    loadingMore,
    size,
    setSize,
    error,
    mutate,
  };
};
