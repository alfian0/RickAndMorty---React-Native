import CustomInput from "@/components/customInput";
import { useForm } from "react-hook-form";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface LoginInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInputs>({
    defaultValues: { email: "default email" },
  });

  const pwd = watch("password");

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
          <Button title="SignIn" onPress={handleSubmit(() => {})} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
