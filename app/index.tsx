import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  Dimensions,
  ListRenderItem,
} from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useCallback, useMemo } from "react";
// import useIndex from "@/hooks/index.hooks";
import useIndex from "@/hooks/index.axios.query.hooks";
import { useAuthStore } from "@/stores/authStore";
import { Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/redux/authStore";
import { logout } from "@/stores/redux/authThunk";
import { logoutRequest } from "../stores/redux-toolkit/authSlice";

const numColumns = 2; // Number of columns in grid
const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / numColumns - 16; // Adjust spacing

export default function Index() {
  const { data, error, isLoading, isFetchingMore, refetch, loadMore } =
    useIndex();

  // Zustand
  // const { logout } = useAuthStore();

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  // Thunk
  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  // Saga
  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const keyExtractor = useMemo(
    () => (item: any, index: number) => String(index),
    []
  );

  const renderItem: ListRenderItem<any> = useCallback(({ item }) => {
    return (
      <View style={{ width: cardWidth }} className="my-1">
        <Stack.Screen
          options={{
            title: "Rick and Morty",
            // headerRight: () => <Button onPress={() => logout()}>Logout</Button>,
            headerRight: () => (
              <Button onPress={() => handleLogout()}>Logout</Button>
            ),
          }}
        />
        <Card className="overflow-hidden">
          <Image source={{ uri: item.image }} className="h-44" />
          <Card.Content>
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
        <Button
          mode="contained"
          onPress={() => {
            refetch();
          }}
        >
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
