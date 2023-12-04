import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  //as soon as the Timer component mounts
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id); //on unmount
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
