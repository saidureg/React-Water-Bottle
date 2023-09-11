import "./Bottle.css";
import PropTypes from "prop-types";
const Bottle = ({ bottle, handelAddToCart }) => {
  const { name, img, price } = bottle;
  return (
    <div className="bottle">
      <img src={img} alt={name} />
      <h3>Bottle: {name} </h3>
      <p>Price: {price} </p>
      <button onClick={() => handelAddToCart(bottle)}>Purchase</button>
    </div>
  );
};

Bottle.propTypes = {
  bottle: PropTypes.object.isRequired,
  handelAddToCart: PropTypes.func.isRequired,
};

export default Bottle;
