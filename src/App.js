import "./App.css";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [bumpAnimation, setBumpAnimation] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleHeaderButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCheckout(false);
  };

  const handleBumpAnimation = () => {
    setBumpAnimation(true);
    const resetBump = () => {
      setBumpAnimation(false);
    };
    setTimeout(resetBump, 300);
  };

  return (
    <CartProvider>
      <Header
        handleHeaderButtonClick={handleHeaderButtonClick}
        bumpAnimation={bumpAnimation}
      />
      <Meals handleBumpAnimation={handleBumpAnimation} />
      <Cart
        showCheckout={showCheckout}
        closeModal={handleCloseModal}
        showModal={showModal}
        openCheckout={setShowCheckout}
      />
    </CartProvider>
  );
}

export default App;
