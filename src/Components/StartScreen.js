import QuestionsCount from "./QuestionsCount";

export default function StartScreen({
  numQuestions,
  dispatch,
  selectedNumberOfQuestions,
  maxQuestions,
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3> MCQ's to test your React mastery.</h3>
      <QuestionsCount
        selectedNumberOfQuestions={selectedNumberOfQuestions}
        dispatch={dispatch}
        numQuestions={numQuestions}
        maxQuestions={maxQuestions}
      />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
