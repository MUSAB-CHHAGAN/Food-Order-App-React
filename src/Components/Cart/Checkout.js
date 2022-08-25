/** @format */
import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

import { useContext, useRef, useState } from "react";
const Checkout = props => {
  const cartCtx = useContext(CartContext);
  const isEmpty = value => value.trim() === "";
  const isFiveChars = value => value.trim().length !== 6;
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    postalCode: true,
    city: true,
  });
  //
  const nameRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();
  //

  //

  const confirmHandler = event => {
    event.preventDefault();
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const addressIsValid = !isEmpty(address);
    const cityIsValid = !isEmpty(city);
    const postalCodeIsValid = !isFiveChars(postalCode);
    const formIsValid =
      nameIsValid &&
      addressIsValid &&
      cityIsValid &&
      postalCodeIsValid;
    setFormInputValidity({
      name: nameIsValid,
      address: addressIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name,
      postalCode,
      city,
      address,
      totalAmount: cartCtx.totalAmount,
    });
  };
  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formInputValidity.name && <p>Enter valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.address ? "" : classes.invalid
        }`}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressRef}></input>
        {!formInputValidity.address && <p>Enter valid address!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postalCode ? "" : classes.invalid
        }`}>
        <label htmlFor="postalcode">Postal Code</label>
        <input
          type="text"
          id="postal-code"
          ref={postalCodeRef}></input>
        {!formInputValidity.postalCode && (
          <p>Enter valid postal code(6 char)!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}></input>
        {!formInputValidity.city && <p>Enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
