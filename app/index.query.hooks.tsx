import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCharacters = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

export default function useIndex() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.info?.next ? lastPage.info.page + 1 : undefined;
    },
  });

  return {
    data: data?.pages.flatMap((page) => page.results) || [],
    error,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    refetch,
    loadMore: () => hasNextPage && fetchNextPage(),
  };
}
