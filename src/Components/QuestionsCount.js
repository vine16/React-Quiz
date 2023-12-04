export default function QuestionsCount({
  selectedNumberOfQuestions,
  dispatch,
  numQuestions,
  maxQuestions,
}) {
  return (
    <div className="questions-count">
      <label htmlFor="numQuestions">Enter the number of questions:</label>
      <input
        value={selectedNumberOfQuestions}
        type="number"
        className="num-questions"
        name="numQuestions"
        min="3"
        max={maxQuestions}
        required
        onChange={(e) =>
          dispatch({
            type: "changeNumberOfQuestions",
            payload: +e.target.value,
          })
        }
      />
    </div>
  );
}
