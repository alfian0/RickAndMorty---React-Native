import { Text, View } from "react-native";
import { useIndex } from "./index.hooks";

export default function Index() {
  const { data, error, isLoading, refetch } = useIndex();

  console.log(isLoading);
  console.log(data);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
