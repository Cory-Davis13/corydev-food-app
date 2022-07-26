import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Cory's Kitchen</h1>
        <HeaderCartButton
          bumpAnimation={props.bumpAnimation}
          handleHeaderButtonClick={props.handleHeaderButtonClick}
        />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="" />
      </div>
    </Fragment>
  );
};

export default Header;
