import { renderHook, act, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useIndex from "@/app/index.hooks";

// Mock global fetch
global.fetch = jest.fn();

describe("useIndex Hook", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  // Reset mock fetch before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches initial character list successfully", async () => {
    // Mock API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        info: { next: "2" }, // Simulating pagination
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: { name: "Earth", url: "" },
            location: { name: "Earth", url: "" },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
        ],
      }),
    });

    const { result } = renderHook(() => useIndex(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data[0].name).toBe("Rick Sanchez");
    });

    // Ensure fetch was called once
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character?page=1"
    );
  });

  it("fetches more data on pagination", async () => {
    // Mock first response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        info: { next: "2" },
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: { name: "Earth", url: "" },
            location: { name: "Earth", url: "" },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
        ],
      }),
    });

    // Mock second response for pagination
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        info: { next: null },
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
    });

    const { result } = renderHook(() => useIndex(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
      expect(result.current.data[1].name).toBe("Morty Smith");
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character?page=2"
    );
  });

  it("handles API errors", async () => {
    // Mock fetch to return an error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useIndex(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
