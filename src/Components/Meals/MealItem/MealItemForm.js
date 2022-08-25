/** @format */
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";
import Input from "../../UI/Input";
const MealItemForm = props => {
  const [amountIsvalid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const sumbitHandler = event => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={sumbitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button type="submilt">+ADD</button>
      {!amountIsvalid && <p>please enter a valid amount (1-5) </p>}
    </form>
  );
};
export default MealItemForm;
