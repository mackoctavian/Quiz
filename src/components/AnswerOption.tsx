import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AnswerOption = {
  option: string;
  isSelected?: boolean;
} & PressableProps;

export default function AnswerOption({
  option,
  isSelected,
  ...pressableProps
}: AnswerOption) {
  return (
    <Pressable
      {...pressableProps}
      style={[
        styles.constainer,
        isSelected && {
          backgroundColor: "#E1F396",
          borderColor: "#E1F396",
        },
      ]}
    >
      <Text>{option}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  constainer: {
    borderWidth: 1,
    padding: 20,
    borderColor: "lightgray",
    borderRadius: 100,
  },
});
