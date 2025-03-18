import { renderHook, act, waitFor } from "@testing-library/react-native";
import { server } from "../__mocks__/server";
import { http, HttpResponse } from "msw";
import useIndex from "@/app/index.hooks";

describe("useIndex Hook (MSW)", () => {
  it("fetches and returns character data successfully", async () => {
    const { result } = renderHook(() => useIndex());

    // Wait for API response
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check final state
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe("Rick Sanchez");
    expect(result.current.error).toBeUndefined();
  });

  it("handles API errors correctly", async () => {
    server.use(
      http.get("https://rickandmortyapi.com/api/character", ({ params }) => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useIndex());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(0);
    expect(result.current.error).toBeDefined();
  });

  it("refetch function works correctly", async () => {
    const { result } = renderHook(() => useIndex());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Override MSW response for refetch
    server.use(
      http.get("https://rickandmortyapi.com/api/character", ({ params }) => {
        return HttpResponse.json({
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
        });
      })
    );

    // Call refetch
    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.[0].name).toBe("Summer Smith");
  });
});
