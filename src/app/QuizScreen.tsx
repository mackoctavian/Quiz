import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { QuestionCard } from "../components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import questions from "../questions";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { useQuizContext } from "../providers/QuizProvider";
import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";

export default function QuizScreen() {
  const { question, questionIndex, onNext, score, totalQuestion, bestScore } =
    useQuizContext();

  const { time, startTimer, clearTimer } = useTimer(20);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [question]);

  useEffect(() => {
    if (time <= 0) {
      onNext();
    }
  }, [time]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>Question 1/{totalQuestion}</Text>
        </View>

        {/* Body */}
        {question ? (
          <>
            <QuestionCard question={question} />{" "}
            <Text style={styles.time}>{time} sec</Text>
          </>
        ) : (
          <Card title="well done">
            <Text>
              Correct answers: {score}/{totalQuestion}
            </Text>
            <Text>Best score: {bestScore}</Text>
          </Card>
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
