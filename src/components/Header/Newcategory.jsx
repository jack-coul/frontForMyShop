import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../redux/features/category";
import styles from "./Header.module.css";

const Newcategory = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleAddCategory = () => {
    dispatch(addCategory(name));
    setName("");
  };
  return (
    <div className={styles.newProduct}>
      <div>
        <input
          type="text"
          placeholder="Название категории"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleAddCategory}>Добавить</button>
      </div>
    </div>
  );
};

export default Newcategory;
