import { useEffect, useState } from "react";
import Bottle from "../bottle/bottle";
import "./Bottles.css";
import {
  addToLS,
  getStoredCart,
  removeFromLS,
} from "../../utilites/localstorage";
import Cart from "../cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ProgrammingHero1/memorable-water-bottle/main/public/bottles.json"
    )
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  // show the cart
  useEffect(() => {
    console.log("called the effect", bottles.length);
    if (bottles.length) {
      const storedCart = getStoredCart();
      // console.log(storedCart);
      const savedCart = [];
      for (const id of storedCart) {
        // console.log(id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        savedCart.push(bottle);
      }
      console.log(savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handelAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    // visual cart remove
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    // remove From LS
    removeFromLS(id);
  };

  return (
    <div>
      <h2>Bottle Available: {bottles.length} </h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            handelAddToCart={handelAddToCart}
            bottle={bottle}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
