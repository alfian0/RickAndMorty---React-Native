import { useAuthStore } from "@/stores/authStore";
import { renderHook } from "@testing-library/react-native";
import { act } from "react";

jest.mock("firebase/app");
jest.mock("firebase/auth");

describe("Auth Store", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Prevents previous test leaks
  });

  it("should start with default state", () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should log in a user successfully", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("test@example.com", "password123");
    });

    expect(result.current.user?.email).toEqual("test@example.com");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should register a user successfully", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.register("new@example.com", "password123");
    });

    expect(result.current.user?.email).toEqual("new@example.com");
  });

  it("should fail login with incorrect credentials", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("wrong@example.com", "wrongpassword");
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe("Invalid credentials");
  });

  it("should log out the user", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("test@example.com", "password123");
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
