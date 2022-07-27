import { Fragment, useContext } from "react";
import styles from "./CheckoutForm.module.css";
import CartContext from "../../store/cart-context";
import useInput from "../../hooks/use-input";

const CheckoutForm = (props) => {
  const cartCtx = useContext(CartContext);

  const {
    enteredValue: enteredFirstName,
    enteredValueIsValid: enteredFirstNameIsValid,
    hasError: firstNameHasError,
    valueInputChange: handleFirstNameChange,
    handleValueBlur: handleFirstNameBlur,
    reset: resetFirstName,
  } = useInput((val) => val.trim() !== "");

  const {
    enteredValue: enteredLastName,
    enteredValueIsValid: enteredLastNameIsValid,
    hasError: lastNameHasError,
    valueInputChange: handleLastNameChange,
    handleValueBlur: handleLastNameBlur,
    reset: resetLastName,
  } = useInput((val) => val.trim() !== "");

  const {
    enteredValue: enteredAddress,
    enteredValueIsValid: enteredAddressIsValid,
    hasError: addressHasError,
    valueInputChange: handleAddressChange,
    handleValueBlur: handleAddressBlur,
    reset: resetAddress,
  } = useInput((val) => val.trim() !== "");

  const {
    enteredValue: enteredCity,
    enteredValueIsValid: enteredCityIsValid,
    hasError: cityHasError,
    valueInputChange: handleCityChange,
    handleValueBlur: handleCityBlur,
    reset: resetCity,
  } = useInput((val) => val.trim() !== "");

  const {
    enteredValue: enteredPhone,
    enteredValueIsValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    valueInputChange: handlePhoneChange,
    handleValueBlur: handlePhoneBlur,
    reset: resetPhone,
  } = useInput((val) => val.trim() !== "");

  const formIsValid =
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredAddressIsValid &&
    enteredCityIsValid &&
    enteredPhoneIsValid;

  const formatSum = (amt, prc) => {
    let total;
    total = (amt * prc).toFixed(2);
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");

    let order = {};

    for (const item in cartCtx.items) {
      order[item] = {
        name: cartCtx.items[item].name,
        amount: cartCtx.items[item].amount,
        price: cartCtx.items[item].price,
      };
    }

    const submitData = {
      name: `${enteredFirstName} ${enteredLastName}`,
      address: `${enteredAddress} ${enteredCity}`,
      cart: order,
      total: cartCtx.totalAmount,
    };

    fetch("https://hooks-demo-f241f-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    cartCtx.resetCart();
    resetAddress();
    resetFirstName();
    resetLastName();
    resetCity();
    resetPhone();
    props.closeModal();
  };

  let firstNameClasses = firstNameHasError
    ? `${styles["form-input"]} ${styles["input-error"]}`
    : `${styles["form-input"]}`;

  let lastNameClasses = lastNameHasError
    ? `${styles["form-input"]} ${styles["input-error"]}`
    : `${styles["form-input"]}`;

  let addressClasses = addressHasError
    ? `${styles["form-input"]} ${styles["input-error"]}`
    : `${styles["form-input"]}`;

  let cityClasses = cityHasError
    ? `${styles["form-input"]} ${styles["input-error"]}`
    : `${styles["form-input"]}`;

  let phoneClasses = phoneHasError
    ? `${styles["form-input"]} ${styles["input-error"]}`
    : `${styles["form-input"]}`;

  let buttonClasses = formIsValid
    ? `${styles["btn-submit"]}`
    : `${styles["btn-submit"]} ${styles["form-error"]}`;

  return (
    <Fragment>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className={`${styles["form-field"]} ${styles["half"]}`}>
          <div className={firstNameClasses}>
            <label>First Name</label>
            <input
              onBlur={handleFirstNameBlur}
              onChange={handleFirstNameChange}
              value={enteredFirstName}
              type="text"
            ></input>
          </div>
          <div className={lastNameClasses}>
            <label>Last Name</label>
            <input
              onBlur={handleLastNameBlur}
              onChange={handleLastNameChange}
              value={enteredLastName}
              type="text"
            ></input>
          </div>
        </div>
        <div className={`${styles["form-field"]} ${styles["half"]}`}>
          <div className={addressClasses}>
            <label>Address</label>
            <input
              onBlur={handleAddressBlur}
              onChange={handleAddressChange}
              value={enteredAddress}
              type="text"
            ></input>
          </div>
          <div className={cityClasses}>
            <label>City</label>
            <input
              onBlur={handleCityBlur}
              onChange={handleCityChange}
              value={enteredCity}
              type="text"
            ></input>
          </div>
        </div>
        <div className={styles["form-field"]}>
          <div className={phoneClasses}>
            <label>Phone</label>
            <input
              onBlur={handlePhoneBlur}
              onChange={handlePhoneChange}
              value={enteredPhone}
              type="tel"
            ></input>
          </div>
        </div>
        <div className={styles["meal-list"]}>
          {cartCtx.items.map((meal) => {
            return (
              <div key={meal.id} className={styles["meal-line"]}>
                <span>{meal.name}</span>
                <span>
                  {meal.amount} x ${meal.price.toFixed(2)}
                </span>
                <span>${formatSum(meal.amount, meal.price)}</span>
              </div>
            );
          })}
          <hr />
          <span className={styles["meal-total"]}>
            Total: ${cartCtx.totalAmount}
          </span>
        </div>
        <button disabled={!formIsValid} className={buttonClasses}>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default CheckoutForm;
