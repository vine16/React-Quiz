import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

//1. user can select the number of questions
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0, //current question
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  selectedNumberOfQuestions: "",
};

//put all the logic for calculating the next state
//right into the reducer
//state = current state
//action = object passed insdie the dispatch function
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.selectedNumberOfQuestions * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return {
    //   ...state,
    //   points: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",
    // };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "changeNumberOfQuestions":
      return {
        ...state,
        selectedNumberOfQuestions: action.payload,
      };
    default:
      throw new Error("action is unknown");
  }
}

export default function App() {
  const [
    {
      highScore,
      secondsRemaining,
      questions,
      status,
      index,
      answer,
      points,
      selectedNumberOfQuestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  //derived state
  const numQuestions = selectedNumberOfQuestions;
  const maxQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr, index) =>
      index + 1 <= selectedNumberOfQuestions ? acc + curr.points : acc,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            selectedNumberOfQuestions={selectedNumberOfQuestions}
            maxQuestions={maxQuestions}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            highScore={highScore}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
