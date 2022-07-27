import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const valueInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleValueBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    enteredValueIsValid,
    hasError,
    valueInputChange,
    handleValueBlur,
    reset,
  };
};

export default useInput;
