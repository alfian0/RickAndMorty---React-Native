import { ActivityIndicator, FlatList, View, Image } from "react-native";
import { useIndex } from "./index.hooks";
import { Card, Text, Button } from "react-native-paper";

export default function Index() {
  const { data, error, isLoading, isFetchingMore, refetch, loadMore } =
    useIndex();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text>Loading characters...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center text-red-500">Failed to load data</Text>
        <Button mode="contained" onPress={refetch}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mx-4 my-2">
            <Card>
              <Card.Content>
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-44 rounded-md"
                />
                <Text variant="titleMedium">{item.name}</Text>
                <Text>{item.species}</Text>
                <Text>{item.location.name}</Text>
              </Card.Content>
            </Card>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5} // Triggers when scrolled halfway
        ListFooterComponent={
          isFetchingMore ? (
            <View className="py-4 items-center">
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />
    </View>
  );
}
