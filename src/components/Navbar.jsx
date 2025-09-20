import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, cartItems } =
    useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">TF Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(!showCart)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
