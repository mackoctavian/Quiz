import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";
import questions from "../questions";
import { Question } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type QuizContext = {
  question?: Question;
  questionIndex: number;
  onNext: () => void;
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
  score: number;
  totalQuestion: number;
  bestScore: number;
};

export const QuizContext = createContext<QuizContext>({
  questionIndex: 0,
  setSelectedOption: () => {},
  score: 0,
  totalQuestion: 0,
  bestScore: 0,
  onNext: () => {},
});

function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const question = questions[questionIndex];
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const isFinished = questionIndex >= questions.length;

  useEffect(() => {
    loadBestScore();
  }, []);

  const saveBestScore = async (score: number) => {
    try {
      await AsyncStorage.setItem("best-score", score.toString());
    } catch (e) {}
  };

  const loadBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem("best-score");
      if (value !== null) {
        setBestScore(Number.parseInt(value));
      }
    } catch (e) {}
  };

  useEffect(() => {
    //Check if there is a new best score
    if (isFinished && score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [isFinished]);

  const restart = () => {
    setScore(0);
    setQuestionIndex(0);
    setSelectedOption("");
  };

  const onNext = () => {
    if (isFinished) {
      restart();
      return;
    }

    if (selectedOption === question?.correctAnswer) {
      setScore((value) => value + 1);
    }
    setQuestionIndex((index) => index + 1);
  };

  return (
    <QuizContext.Provider
      value={{
        question,
        questionIndex,
        onNext,
        selectedOption,
        setSelectedOption,
        score,
        totalQuestion: questions.length,
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export const useQuizContext = () => useContext(QuizContext);
export default QuizProvider;
