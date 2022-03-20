import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "./Category";
import { getCategory } from "../../../redux/features/category";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  const categories = useSelector((state) => state.category.category);
  const loadingCategory = useSelector((state) => state.category.loadCategory);
  return loadingCategory ? (
    "Loading..."
  ) : (
    <div className={styles.categories}>
      {categories.map((category) => {
        return (
          <Category key={category._id} id={category._id} name={category.name} />
        );
      })}
    </div>
  );
};

export default Sidebar;
