import CustomInput from "@/components/customInput";
import { useAuthStore } from "@/src/state-management/zustand/authStore";
import {
  AppDispatch,
  RootState,
} from "@/src/state-management/redux-thunk/authStore";
import { login } from "@/src/state-management/redux-thunk/thunks/authThunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import LoginInputs from "@/src/types/loginInput";
import { useAuth } from "@/src/state-management/hooks/useAuth";

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default function Login() {
  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInputs>({
    defaultValues: { email: "test@example.com", password: "password123" },
  });

  const pwd = watch("password");

  // Zustand
  // const { login, loading, error } = useAuthStore();

  // const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  //   login(data.email, data.password);
  // };

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, loginUser } = useAuth();

  // Thunk
  // const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  //   dispatch(login(data.email, data.password));
  // };

  // Saga
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginUser(data);
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
      <View className="flex-1 mx-2 my-2">
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
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          LogIn
        </Button>
      </View>
    </ScrollView>
  );
}
