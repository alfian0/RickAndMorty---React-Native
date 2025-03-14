import { ActivityIndicator, Button, FlatList, View, Image } from "react-native";
import { useIndex } from "./index.hooks";
import { Card, Text } from "react-native-paper";

export default function Index() {
  const { data, error, isLoading, refetch } = useIndex();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator />
        <Text className="text-center">Loading characters...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <Text className="text-center">Failed to load data</Text>
        <Button title="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mx-4 my-2">
            <Card>
              <Card.Content>
                <Image source={{ uri: item.image }} className="flex-1 h-44" />
                <Text variant="titleMedium">{item.name}</Text>
                <Text>{item.species}</Text>
                <Text>{item.location.name}</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      />
    </View>
  );
}
