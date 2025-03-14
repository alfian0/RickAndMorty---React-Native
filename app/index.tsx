import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  Dimensions,
  ListRenderItem,
} from "react-native";
import { Card, Text, Button } from "react-native-paper";
import useIndex from "./index.hooks";
import { useCallback, useMemo } from "react";

const numColumns = 2; // Number of columns in grid
const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / numColumns - 16; // Adjust spacing

export default function Index() {
  const { data, error, isLoading, isFetchingMore, refetch, loadMore } =
    useIndex();

  const keyExtractor = useMemo(
    () => (item: any, index: number) => String(index),
    []
  );

  const renderItem: ListRenderItem<any> = useCallback(({ item }) => {
    return (
      <View style={{ width: cardWidth, marginVertical: 8 }}>
        <Card>
          <Card.Content>
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 120, borderRadius: 8 }}
            />
            <Text variant="titleMedium">{item.name}</Text>
            <Text>{item.species}</Text>
            <Text>{item.location.name}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }, []);

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
        keyExtractor={keyExtractor}
        numColumns={numColumns} // Enable grid layout
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
        }} // Evenly distribute columns
        renderItem={renderItem}
        initialNumToRender={10} // Optimize initial render
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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
