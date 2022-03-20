import React from "react";
import Productinbasket from "./Productinbasket";
import styles from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { byeProducts } from "../../../redux/features/basket";
import { removeCash } from "../../../redux/features/application";

const Basket = ({ setOpenBasket }) => {
  const productInBasket = useSelector((state) => state.basket.basket);
  const finallySum = useSelector((state) => state.basket.finally);
  const cashUser = useSelector((state) => state.application.cash);
  const dispatch = useDispatch();
  const handleByeProducts = (clearOrBye) => {
    if (clearOrBye === "bye") {
      if (finallySum <= cashUser) {
        dispatch(byeProducts(clearOrBye));
        dispatch(removeCash(finallySum));
        setOpenBasket(false);
      }
    } else {
      dispatch(byeProducts(clearOrBye));
      setOpenBasket(false);
    }
  };
  return (
    <div className={styles.table}>
      {productInBasket.length > 0 ? (
        <>
          <table>
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.older}>#</th>
                <th className={styles.image}></th>
                <th className={styles.name}>Товар</th>
                <th className={styles.left}>Остаток</th>
                <th className={styles.count}>Кол-во</th>
                <th className={styles.deleteProduct}></th>
              </tr>
            </thead>
            <tbody className={styles.one}>
              {productInBasket.map((product, index) => (
                <Productinbasket
                  key={product.id}
                  productInBasket={product}
                  index={index}
                />
              ))}
            </tbody>
          </table>
          <div className={styles.finally}>
            <span>Итого</span> <span>{finallySum}</span>
          </div>
          <div className={styles.clearBasket}>
            <span
              className={styles.bye}
              onClick={() => handleByeProducts("bye")}
            >
              Купить
            </span>
            <span
              className={styles.clearBasketSpan}
              onClick={() => handleByeProducts("clear")}
            >
              Очистить корзину
            </span>
          </div>
        </>
      ) : (
        "Добавьте товары в корзину"
      )}
    </div>
  );
};

export default Basket;
