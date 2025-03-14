import { useEffect, useState } from "react";

interface Location {
  name: string;
  url: string;
}

interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead";
  species: string;
  type: string;
  gender: "Male" | "Female";
  origin: Location;
  location: Location;
  image: string;
}

export const useIndex = () => {
  const [data, setData] = useState<Character[]>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, refetch: fetchData };
};
