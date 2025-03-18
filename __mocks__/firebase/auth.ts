export const createUserWithEmailAndPassword = jest.fn((auth, email, password) =>
  Promise.resolve({
    user: {
      displayName: "New User",
      email,
      phoneNumber: null,
      photoURL: null,
    },
  })
);
export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
  if (email === "wrong@example.com") {
    return Promise.reject(new Error("Invalid credentials"));
  }

  return Promise.resolve({
    user: {
      displayName: "Test User",
      email,
      phoneNumber: null,
      photoURL: null,
    },
  });
});
export const onAuthStateChanged = jest.fn();
export const signOut = jest.fn();
export const getAuth = jest.fn();
