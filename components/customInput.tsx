import { Text, View } from "react-native";
import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import { TextInput } from "react-native-paper";

interface CustomInputProps {
  control: Control<any>;
  name: string;
  rules: RegisterOptions<FieldValues, string>;
  placeholder: string;
  secureTextEntry: boolean;
}

const CustomInput = ({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View className="my-2">
          <TextInput
            label={name}
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <Text className="color-red-500">{error.message || "error"}</Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomInput;
