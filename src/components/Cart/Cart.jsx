import { Fragment, useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CheckoutForm from "../Checkout/CheckoutForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const handleDecrement = (meal) => {
    cartCtx.removeItem(meal.id);
    if (cartCtx.items[0].amount <= "1" && cartCtx.items.length === 1) {
      props.closeModal();
    }
  };

  const handleIncrement = (meal) => {
    cartCtx.addItem({
      ...meal,
      amount: 1,
    });
  };

  const handleSubmit = () => {
    props.openCheckout(true);
  };

  return (
    <Fragment>
      <Modal
        classes={styles["cart-modal"]}
        closeModal={props.closeModal}
        showModal={props.showModal}
      >
        {props.showCheckout ? (
          <CheckoutForm closeModal={props.closeModal} />
        ) : (
          <div>
            <ul className={styles["ul-style"]}>
              {" "}
              {cartCtx.items.map((meal) => {
                return (
                  <li className={styles["cart-item"]} key={meal.id}>
                    <div>
                      <h3>{meal.name}</h3>{" "}
                      <span className={styles["cart-item-price"]}>
                        ${meal.price.toFixed(2)}
                      </span>{" "}
                      <input
                        typeof="number"
                        readOnly
                        value={`x ${meal.amount}`}
                        className={styles["cart-qty"]}
                      />
                    </div>

                    <div className={styles["btn-container"]}>
                      <button
                        className={styles["cart-adjust-btn"]}
                        onClick={() => handleDecrement(meal)}
                      >
                        -
                      </button>
                      <button
                        className={styles["cart-adjust-btn"]}
                        onClick={() => handleIncrement(meal)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles["cart-total"]}>
              <h3>${cartCtx.totalAmount}</h3>
              <button
                onClick={handleSubmit}
                className={styles["submit-button"]}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default Cart;
