import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: +existingCartItem.amount + +action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      let updatedRemoveTotalAmount;
      const existingRemovedItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingRemoveCartItem = state.items[existingRemovedItemIndex];
      let updatedRemoveItems;

      if (existingRemoveCartItem.amount > 1) {
        const updatedRemoveItem = {
          ...existingRemoveCartItem,
          amount: +existingRemoveCartItem.amount - 1,
        };

        updatedRemoveItems = [...state.items];
        updatedRemoveItems[existingRemovedItemIndex] = updatedRemoveItem;
        updatedRemoveTotalAmount =
          state.totalAmount - existingRemoveCartItem.price;
      } else {
        updatedRemoveItems = state.items.filter((item) => {
          return item.id !== action.id;
        });
        updatedRemoveTotalAmount =
          state.totalAmount -
          existingRemoveCartItem.amount * existingRemoveCartItem.price;
      }

      return {
        items: updatedRemoveItems,
        totalAmount: updatedRemoveTotalAmount,
      };
    case "RESET":
      return defaultCart;
    default:
      return defaultCart;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCart);

  const addCartItemHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const removeCartItemHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const resetCartHandler = () => {
    dispatch({ type: "RESET" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount.toFixed(2),
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
    resetCart: resetCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
