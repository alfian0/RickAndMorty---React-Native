import { useIndex } from "@/app/index.hooks";
import { renderHook, act, waitFor } from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useIndex Hook", () => {
  it("fetches and returns character data successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: { name: "Earth", url: "" },
            location: { name: "Citadel of Ricks", url: "" },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
        ],
      })
    );

    const { result } = renderHook(() => useIndex());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe("Rick Sanchez");
    expect(result.current.error).toBeUndefined();
  });

  it("handles API errors correctly", async () => {
    fetchMock.mockReject(() => Promise.reject("API is down"));

    const { result } = renderHook(() => useIndex());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe("API is down");
  });

  it("refetch function works correctly", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            id: 2,
            name: "Morty Smith",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: { name: "Earth", url: "" },
            location: { name: "Earth", url: "" },
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          },
        ],
      })
    );

    const { result } = renderHook(() => useIndex());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            id: 3,
            name: "Summer Smith",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Female",
            origin: { name: "Earth", url: "" },
            location: { name: "Earth", url: "" },
            image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
          },
        ],
      })
    );

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.[0].name).toBe("Summer Smith");
  });
});
