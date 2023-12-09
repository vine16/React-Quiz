import Options from "./Options";

export default function Question({
  answers,
  question,
  dispatch,
  answer,
  QIndex,
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        QIndex={QIndex}
        answer={answer}
      />
    </div>
  );
}
