import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductInBasket,
  getAllProductsInBasket,
} from "../../../redux/features/basket";
import { deleteProduct } from "../../../redux/features/products";
import styles from "./Products.module.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(false);
  const role = useSelector((state) => state.application.role);
  const { basket, adding } = useSelector((state) => state.basket);
  const token = useSelector((state) => state.application.token);
  const loadTheProducts = useSelector(
    (state) => state.products.loadTheProducts
  );
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleAddProductToBasket = (id) => {
    dispatch(addProductInBasket(id));
  };
  useEffect(() => {
    dispatch(getAllProductsInBasket());
  }, [dispatch]);
  const searchProduct = basket.find(
    (productBasket) => productBasket.id === product._id
  );

  const handleOpenModalMessage = () => {
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };
  return (
    <div className={styles.product}>
      {role === "admin" && (
        <div
          className={styles.deleteProduct}
          onClick={() => handleDeleteProduct(product._id)}
        >
          x
        </div>
      )}
      <div className={styles.img}>
        <img src={product.image} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <span className={styles.details}>details</span>
        </div>
        <div className={styles.allPrices}>
          <div>
            {product.price}
            <span>₽</span>
          </div>
          {product.oldPrice && (
            <div className={styles.oldPrice}>
              {product.oldPrice}
              <span>₽</span>
            </div>
          )}
        </div>
      </div>

      {loadTheProducts ? (
        "Loading..."
      ) : (
        <div
          className={
            searchProduct || !product.left
              ? styles.buttonOne
              : styles.byeProduct
          }
        >
          {message && (
            <div className={styles.messageSignin}>
              Войдите или зарегистрируйтесь что бы купить
            </div>
          )}
          <button
            disabled={searchProduct || !product.left || adding}
            onClick={
              token
                ? () => handleAddProductToBasket(product._id)
                : handleOpenModalMessage
            }
          >
            {!product.left
              ? "Нет в наличии"
              : searchProduct
              ? "в корзине"
              : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
