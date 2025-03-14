import { APIResponse } from "@/types/character";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCharacters = async ({ pageParam = 1 }): Promise<APIResponse> => {
  const { data } = await axios.get<APIResponse>(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`
  );
  return data;
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
