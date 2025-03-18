import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

jest.mock("firebase/auth");

describe("Firebase Auth Mocking", () => {
  test("should mock createUserWithEmailAndPassword", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "12345" },
    });

    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "test@example.com",
      "password"
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password"
    );
    expect(userCredential.user.uid).toBe("12345");
  });

  test("should mock signInWithEmailAndPassword", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "67890" },
    });

    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "test@example.com",
      "password"
    );

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password"
    );
    expect(userCredential.user.uid).toBe("67890");
  });

  test("should mock signOut", async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);

    const auth = getAuth();
    await signOut(auth);

    expect(signOut).toHaveBeenCalledWith(auth);
  });

  test("should mock onAuthStateChanged", () => {
    const mockCallback = jest.fn();
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: "99999" }); // Simulate a user being logged in
      return () => {}; // Mock unsubscribe function
    });

    const auth = getAuth();
    onAuthStateChanged(auth, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith({ uid: "99999" });
  });
});
