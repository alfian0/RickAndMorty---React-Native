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
      if (!lastPage.info?.next) return undefined; // No more pages

      // Parse the "next" URL to extract the "page" parameter
      const url = new URL(lastPage.info.next);
      const pageParam = url.searchParams.get("page");

      // Return the page number as a number (or undefined if not found)
      return pageParam ? Number(pageParam) : undefined;
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
