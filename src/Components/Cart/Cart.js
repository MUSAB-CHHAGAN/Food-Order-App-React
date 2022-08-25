/** @format */
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
const Cart = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSumbit] = useState(false);
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const totalAount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const addItemHandler = id => {
    cartCtx.oneItem(id);
  };
  const removeItemHandler = id => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order--react-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSumbit(true);
    cartCtx.clearCart();
  };
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          id={item.id}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.onClose}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItem}
      <div className={classes.total}>
        <span>Amount</span>
        <span>{totalAount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onClose={props.onClose}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const isSubmittedModal = (
    <>
      <p>Order placed successfully...</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {didSubmit && !isSubmitting && isSubmittedModal}
    </Modal>
  );
};
export default Cart;
