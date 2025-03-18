import Character from "@/types/character";
import { useEffect, useState } from "react";

export default function useIndex() {
  const [data, setData] = useState<Character[]>([]);
  const [error, setError] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const json = await response.json();

      if (pageNumber === 1) {
        setData(json.results);
      } else {
        setData((prevData) => [...prevData, ...json.results]);
      }

      setHasNextPage(json.info?.next !== null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  };

  return {
    data,
    error,
    isLoading,
    isFetchingMore,
    refetch: () => fetchData(1),
    loadMore,
  };
}
