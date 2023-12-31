export default function NextButton({
  index,
  numQuestions,
  dispatch,
  answer,
  maxPossiblePoints,
}) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="
        "
        onClick={() => dispatch({ type: "finish", payload: maxPossiblePoints })}
      >
        Finish
      </button>
    );
}
