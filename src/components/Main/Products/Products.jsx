import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/features/products";
import Product from "./Product";
import styles from "./Products.module.css";

const Products = React.memo(({ products }) => {
  const dispatch = useDispatch();
  const loadTheProduct = useSelector((state) => state.products.loadTheProduct);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  // console.log(products);
  return loadTheProduct ? (
    "Loading..."
  ) : (
    <div className={styles.products}>
      {products.map((product) => {
        return <Product key={product._id} product={product} styles={styles} />;
      })}
    </div>
  );
});

export default Products;
