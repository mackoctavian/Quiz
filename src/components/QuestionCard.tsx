import { StyleSheet, Text, View } from "react-native";
import AnswerOption from "./AnswerOption";

export const QuestionCard = (props) => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>{props.question.title}</Text>
      <View>
        <AnswerOption options={props.question.options[0]} />
        <AnswerOption options={props.question.options[1]} />
        <AnswerOption options={props.question.options[2]} />
        <AnswerOption options={props.question.options[3]} />
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
