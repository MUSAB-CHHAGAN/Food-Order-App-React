/** @format */
import CartContext from "./cart-context";
import { useReducer } from "react";

const daefaultCart = { items: [], totalAmount: 0 };
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedAmount =
      state.totalAmount + action.item.amount * action.item.price;
    let updatedItems;

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      console.log(updatedItem);
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    const updatedAmount = state.totalAmount - existingCartItem.price;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        item => item.id !== action.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedAmount };
  }
  if (action.type === "ONE") {
    let updatedItems;
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    let updatedAmount = state.totalAmount + existingCartItem.price;
    return { items: updatedItems, totalAmount: updatedAmount };
  }
  if (action.type === "CLEAR") {
    return { items: [], totalAmount: 0 };
  }
};
const CartProvider = props => {
  const [cartState, dispatchCart] = useReducer(
    cartReducer,
    daefaultCart
  );
  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const oneItemHandler = id => {
    dispatchCart({ type: "ONE", id: id });
  };

  const onAddItemHandler = item => {
    dispatchCart({ type: "ADD", item: item });
  };
  const onRemoveItemHandler = id => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    amount: cartState.amount,
    addItem: onAddItemHandler,
    removeItem: onRemoveItemHandler,
    oneItem: oneItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
