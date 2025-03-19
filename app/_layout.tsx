import { router, Stack } from "expo-router";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import "../global.css";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function RootLayout() {
  const { user } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      useAuthStore.setState({ user });
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
    <PaperProvider>
      <Stack />
    </PaperProvider>
  );
}
