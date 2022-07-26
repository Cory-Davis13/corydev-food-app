import { Fragment } from "react";
import MealsList from "./MealsList";
import PromoCard from "./PromoCard";

const Meals = (props) => {
  return (
    <Fragment>
      <PromoCard />
      <MealsList
        handleAddMeal={props.handleAddMeal}
        handleBumpAnimation={props.handleBumpAnimation}
      />
    </Fragment>
  );
};

export default Meals;
