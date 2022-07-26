import styles from "./MealsList.module.css";
import Card from "../UI/Card";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../store/cart-context";
import Spinner from "../UI/Spinner";

const MealsList = (props) => {
  const qtyRef = useRef([]);
  const cartCtx = useContext(CartContext);
  const [meals, setMeals] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleBtnClick = (meal, i) => {
    meal.amount = qtyRef.current[i].value;
    cartCtx.addItem(meal);
    props.handleBumpAnimation();
  };

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://hooks-demo-f241f-default-rtdb.firebaseio.com/DUMMY_MEALS.json"
      );
      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedData);
      setDataLoading(false);
    };

    fetchMeals();
  }, []);

  return (
    <Card>
      {dataLoading && <Spinner />}
      <ul>
        {" "}
        {meals.map((meal, i) => {
          return (
            <li className={styles.meal} key={meal.id}>
              <div className={styles["meal-offering"]}>
                <span className={styles["meal-title"]}>{meal.name}</span>
                <span className={styles["meal-desc"]}>{meal.description}</span>
                <span className={styles["meal-price"]}>
                  ${meal.price.toFixed(2)}
                </span>
              </div>

              <form onSubmit={submitHandler}>
                <div className={styles["meal-add"]}>
                  <div>
                    <label htmlFor="qty">Amount: </label>
                    <input
                      ref={(el) => (qtyRef.current[i] = el)}
                      id="qty"
                      typeof="number"
                      defaultValue="1"
                    />
                  </div>
                  <button
                    className={styles["add-btn"]}
                    typeof="submit"
                    onClick={() => handleBtnClick(meal, i)}
                  >
                    +Add
                  </button>
                </div>
              </form>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default MealsList;
