import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../../redux/features/category";
import styles from "./Sidebar.module.css";

const Category = ({ name, id }) => {
  const role = useSelector((state) => state.application.role);
  const dispatch = useDispatch();
  const handleDeleteCategory = () => {
    dispatch(deleteCategory(id));
  };
  return (
    <div className={styles.categoryBlock}>
      <Link to={`/${id}`} className={styles.category}>
        <div className={styles.categoryName}>{name}</div>
      </Link>
      {role === "admin" && (
        <div className={styles.deleteCategory} onClick={handleDeleteCategory}>
          x
        </div>
      )}
    </div>
  );
};

export default Category;
