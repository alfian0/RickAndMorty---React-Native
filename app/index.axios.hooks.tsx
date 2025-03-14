import { useEffect, useState } from "react";
import axios from "axios";
import Character from "@/types/character";

export default function useIndex() {
  const [data, setData] = useState<Character[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = async (pageNumber: number) => {
    if (pageNumber === 1) setIsLoading(true);
    else setIsFetchingMore(true);

    axios
      .get(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
      .then(({ data }) => {
        setData((prevData) =>
          pageNumber === 1 ? data.results : [...prevData, ...data.results]
        );
        setHasNextPage(data.info?.next !== null);
      })
      .catch((err) => {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data || "API Error"
            : "Something went wrong"
        );
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetchingMore(false);
      });
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
