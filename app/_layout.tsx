import { router, Stack } from "expo-router";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import "../global.css";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const { user } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
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
