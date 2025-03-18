import CustomInput from "@/components/customInput";
import { useAuthStore } from "@/stores/authStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface LoginInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { login, loading, error } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInputs>({
    defaultValues: { email: "test@example.com", password: "password123" },
  });

  const pwd = watch("password");

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data.email, data.password);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View className="flex-1">
          <CustomInput
            control={control}
            name="email"
            rules={{
              required: "email is required",
              pattern: { value: re, message: "email is invalid" },
            }}
            placeholder="email"
            secureTextEntry={false}
          />
          <CustomInput
            control={control}
            name="password"
            rules={{
              required: "password is required",
              minLength: {
                value: 3,
                message: "Password should minimum 3 characther long",
              },
            }}
            placeholder="password"
            secureTextEntry
          />
          {error && <Text className="text-red-500 mb-2">{error}</Text>}
          <Button title="SignIn" onPress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
