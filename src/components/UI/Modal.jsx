import styles from "./Modal.module.css";
import Card from "./Card";

const Modal = (props) => {
  return (
    <div
      className={
        props.showModal === true
          ? `${styles.modal} ${styles.show}`
          : `${styles.modal}`
      }
      onClick={props.closeModal}
    >
      <Card classes={props.classes} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </Card>
    </div>
  );
};

export default Modal;
