import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuizContext } from "../providers/QuizProvider";

type AnswerOption = {
  option: string;
};

export default function AnswerOption({ option }: AnswerOption) {
  const { selectedOption, setSelectedOption } = useQuizContext();
  const isSelected = option === selectedOption;
  return (
    <Pressable
      onPress={() => setSelectedOption(option)}
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
