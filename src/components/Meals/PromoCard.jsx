import styles from "./PromoCard.module.css";

const PromoCard = () => {
  return (
    <div className={styles["promo-card"]}>
      <h2>Delicious Food, Delivered To You.</h2>
      <p>
        Choose your favortie meal from our broad selection of available meals
        and enjoy a delicious lunch or diner at home.
      </p>

      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </div>
  );
};

export default PromoCard;
