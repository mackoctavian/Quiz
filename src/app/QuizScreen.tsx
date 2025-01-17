import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { QuestionCard } from "../components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import questions from "../questions";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { useState } from "react";

export default function QuizScreen() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];

  const onNext = () => {
    setQuestionIndex((index) => index + 1);
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>Question 1/5</Text>
        </View>

        {/* Body */}
        {question ? (
          <>
            <QuestionCard question={question} />{" "}
            <Text style={styles.time}>20 sec</Text>
          </>
        ) : (
          <Card title="well done" />
        )}

        {/* Footer */}
        <CustomButton
          title="Next"
          rightIcon={
            <FontAwesome6 name="arrow-right-long" size={16} color="white" />
          }
          onPress={onNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  page: {
    flex: 1,
    backgroundColor: "#FDFEF4",
  },
  title: {
    textAlign: "center",
    color: "",
    paddingVertical: 10,
  },
  time: {
    textAlign: "center",
    marginTop: 15,
    color: "#005055",
    fontWeight: "bold",
  },
});
