import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "../global.css";
import Login from "./login";

export default function RootLayout() {
  // return <Login />;

  return (
    <PaperProvider>
      <Stack />
    </PaperProvider>
  );
}
