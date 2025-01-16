import { StyleSheet, Text, View } from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types";

type QuestionCard = {
  question: Question;
};

export const QuestionCard = ({ question }: QuestionCard) => {
  const selectedOption = question.options[0];
  const onOptionSelected = (option: string) => {
    console.warn("selected: ", option);
  };
  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>{question.title}</Text>
      <View style={{ gap: 10 }}>
        {question.options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            isSelected={option === selectedOption}
            onPress={onOptionSelected}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    paddingVertical: 40,
    gap: 20,

    //shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 24,
    fontWeight: "500",
  },
});
