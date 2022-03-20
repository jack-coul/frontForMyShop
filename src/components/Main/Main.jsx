import React, { useEffect } from "react";
import styles from "./Main.module.css";
import Sidebar from "./Categories/Sidebar";
import Products from "./Products/Products";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SigninForm from "../Header/SigninForms/SigninForm";
import SignupForm from "../Header/SigninForms/SignupForm";
import { getUserData } from "../../redux/features/application";

const Main = () => {
  const categories = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.products.products);
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch, token]);
  if (token) {
    return (
      <main className={styles.main}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Products products={products} />} />
          {categories.map((category) => {
            return (
              <Route
                key={category._id}
                path={`/${category._id}`}
                element={
                  <Products
                    products={products.filter(
                      (product) => product.category === category.name
                    )}
                  />
                }
              />
            );
          })}
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    );
  } else {
    return (
      <main className={styles.main}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Products products={products} />} />
          {categories.map((category) => {
            return (
              <Route
                key={category._id}
                path={"/:id"}
                element={
                  <Products
                    products={products.filter(
                      (product) => product.category === category.name
                    )}
                  />
                }
              />
            );
          })}
          <Route path="/login" element={<SigninForm />} />
          <Route path="/logup" element={<SignupForm />} />
        </Routes>
      </main>
    );
  }
};

export default Main;
