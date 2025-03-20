import Character, { APIResponse } from "@/src/types/character";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCharacters = async ({ pageParam = 1 }): Promise<APIResponse> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
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
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info?.next) return undefined; // No more pages

      // Parse the "next" URL to extract the "page" parameter
      const url = new URL(lastPage.info.next);
      const pageParam = url.searchParams.get("page");

      // Return the page number as a number (or undefined if not found)
      return pageParam ? Number(pageParam) : undefined;
    },
    retry: false, // ✅ Disable automatic retries
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
