import { router, Stack } from "expo-router";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import "../global.css";
import { useAuthStore } from "@/src/state-management/zustand/authStore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/src/state-management/redux-saga/authStore";
import { useAuth } from "@/src/state-management/hooks/useAuth";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ReduxLayout />
    </Provider>
  );
}

function ReduxLayout() {
  // const { user } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const queryClient = new QueryClient();
  const { user, changedUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Zustand
      // useAuthStore.setState({ user });

      // Redux
      if (user) {
        changedUser({
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        });
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      if (!user) {
        router.replace("/login");
      } else {
        router.replace("/");
      }
    }
  }, [user, isAuthChecked]);

  if (!isAuthChecked) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </QueryClientProvider>
  );
}
