export interface Location {
  name: string;
  url: string;
}

export default interface Character {
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

export interface APIResponse {
  info: {
    next: string | null;
    page: number;
  };
  results: Character[];
}
