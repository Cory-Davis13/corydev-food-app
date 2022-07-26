import styles from "./HeaderCartButton.module.css";
import CartIcon from "../UI/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const cartCount = cartCtx.items.reduce((curr, item) => {
    return +curr + +item.amount;
  }, 0);

  const validateCart = () => {
    cartCtx.items.length > 0 && props.handleHeaderButtonClick();
  };

  return (
    <button
      className={`${styles.button} ${props.bumpAnimation && styles.bump}`}
      onClick={validateCart}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{cartCount}</span>
    </button>
  );
};

export default HeaderCartButton;
