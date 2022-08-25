/** @format */
import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  amount: 0,
  addItem: item => {},
  removeItem: id => {},
  oneItem: id => {},
  clearCart: () => {},
});

export default CartContext;
