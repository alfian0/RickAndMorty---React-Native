import useIndex from "@/app/index.hooks";
import { renderHook, act, waitFor } from "@testing-library/react-native";

describe("useIndex Hook", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it("fetches and returns character data successfully", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    } as Response);

    const { result } = renderHook(() => useIndex());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toHaveLength(0);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].name).toBe("Rick Sanchez");
    expect(result.current.error).toBeUndefined();
  });

  it("handles API errors correctly", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useIndex());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
  });

  it("refetch function works correctly", async () => {
    const fetchMock = jest.spyOn(global, "fetch");

    // First API response
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    } as Response);

    const { result } = renderHook(() => useIndex());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data[0].name).toBe("Morty Smith");

    // Mock a new API response for refetch
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 3,
            name: "Summer Smith",
            status: "Alive",
            species: "Human",
            gender: "Female",
            origin: { name: "Earth", url: "" },
            location: { name: "Earth", url: "" },
            image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
          },
        ],
      }),
    } as Response);

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data[0].name).toBe("Summer Smith");
  });
});
