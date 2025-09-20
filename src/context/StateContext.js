const { createContext, useContext, useState, useEffect } = require("react");
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const incQty = () => setQty((prev) => prev + 1);
  const decQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice((prev) => +(prev + product.price * quantity).toFixed(2));
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    setQty(1);
    toast.success(`${qty} ${product.name} added successfully`);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value === "inc") {
      foundProduct.quantity += 1;
      const newCartItems = cartItems.map((product) => {
        if (product._id === foundProduct.id) return foundProduct;
        return product;
      });
      setCartItems(newCartItems);
      setTotalPrice((prev) => +(prev + foundProduct.price).toFixed(2));
      setTotalQuantities((prev) => prev + 1);
    } else if (foundProduct.quantity > 1) {
      foundProduct.quantity -= 1;
      const newCartItems = cartItems.map((product) => {
        if (product._id === foundProduct.id) return foundProduct;
        return product;
      });
      setCartItems(newCartItems);
      setTotalPrice((prev) => +(prev - foundProduct.price).toFixed(2));
      setTotalQuantities((prev) => prev - 1);
    }
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    setTotalPrice(
      (prev) => +(prev - foundProduct.price * foundProduct.quantity).toFixed(2)
    );
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
