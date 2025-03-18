import { renderHook, act, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/__mocks__/server";
import useIndex from "@/app/index.hooks";
import { http, HttpResponse } from "msw";

describe("useIndex Hook", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("fetches initial character list successfully", async () => {
    const { result } = renderHook(() => useIndex(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data[0].name).toBe("Rick Sanchez");
    });
  });

  it("fetches more data on pagination", async () => {
    const { result } = renderHook(() => useIndex(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2); // Ensure pagination works
    });
  });

  it("handles API errors", async () => {
    server.use(
      http.get("https://rickandmortyapi.com/api/character", ({ params }) => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useIndex(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
