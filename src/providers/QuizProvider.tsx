import React, { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";
import questions from "../questions";
import { Question } from "../types";

type QuizContext = {
  question?: Question;
  questionIndex: number;
  onNext?: () => void;
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
  score: number;
  totalQuestion: number;
};

export const QuizContext = createContext<QuizContext>({
  questionIndex: 0,
  setSelectedOption: () => {},
  score: 0,
  totalQuestion: 0,
});

function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const question = questions[questionIndex];
  const [score, setScore] = useState(0);
  const isFinished = questionIndex >= questions.length;

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export const useQuizContext = () => useContext(QuizContext);
export default QuizProvider;
