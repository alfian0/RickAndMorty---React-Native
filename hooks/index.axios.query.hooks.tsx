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
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.info?.next
        ? Number(lastPage.info.next.at(-1))
        : undefined;
    },
    retry: false,
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
