import { ActivityIndicator, Button, FlatList, View, Image } from "react-native";
import { useIndex } from "./index.hooks";
import { Card, Text } from "react-native-paper";

export default function Index() {
  const { data, error, isLoading, refetch } = useIndex();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading characters...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Failed to load data</Text>
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
          <Card>
            <Image source={{ uri: item.image }} width={100} height={100} />
            <Card.Content>
              <Text>{item.name}</Text>
              <Text>{item.species}</Text>
              <Text>{item.location.name}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
