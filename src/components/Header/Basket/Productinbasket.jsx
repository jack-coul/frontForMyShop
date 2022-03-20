import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmountProductinBasket,
  deleteProductFromBasket,
  removeAmountProductinBasket,
} from "../../../redux/features/basket";
import styles from "./Basket.module.css";

const Productinbasket = ({ productInBasket, index }) => {
  const products = useSelector((state) => state.products.products);
  // const getting = useSelector((state) => state.basket.getting);
  // const productloadInBasket = useSelector((state) => state.basket.productloadInBasket);
  const removeAmout = useSelector((state) => state.basket.removeAmout);
  const { productloadInBasket, getting } = useSelector((state) => state.basket);
  const product = products.find(
    (product) => product._id === productInBasket.id
  );

  const dispatch = useDispatch();
  const handleDeleteProductFromBasket = (id) => {
    dispatch(deleteProductFromBasket(id));
  };

  const handleChangeCountProduct = (id, incOrDec) => {
    if (incOrDec === "+") {
      dispatch(addAmountProductinBasket(id));
    } else {
      dispatch(removeAmountProductinBasket(id));
    }
  };
  return getting ? (
    "loading..."
  ) : (
    <tr className={styles.tableRow}>
      <td className={styles.older}>{index + 1}</td>
      <td className={styles.image}>
        <img src={product.image} alt="Ахилесс" />
      </td>
      <td className={styles.name}>{product.name}</td>
      <td className={styles.left}>{productInBasket.left}</td>
      <td className={styles.count}>
        <button
          disabled={productloadInBasket || !productInBasket.left}
          onClick={() => handleChangeCountProduct(productInBasket.id, "+")}
        >
          +
        </button>
        <span>{productInBasket.amount}</span>
        <button
          onClick={() => handleChangeCountProduct(productInBasket.id, "-")}
          disabled={
            removeAmout || productInBasket.amount === 1 || productloadInBasket
          }
        >
          -
        </button>
      </td>
      <td
        onClick={() => handleDeleteProductFromBasket(productInBasket.id)}
        className={styles.deleteProduct}
      >
        x
      </td>
    </tr>
  );
};

export default Productinbasket;
