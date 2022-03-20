import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/products";
import styles from "./Header.module.css";

const Newproduct = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [left, setLeft] = useState("");
  const handleAddProduct = () => {
    dispatch(addProduct(image, category, name, price, oldPrice, left));
    setImage("");
    setCategory("");
    setName("");
    setPrice("");
    setOldPrice("");
    setLeft("");
  };
  return (
    <div className={styles.newProduct}>
      <div>
        <input
          type="text"
          placeholder="вставьте ссылку на изображение"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="категория товара"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="имя товара"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="цена товара"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="старая цена если есть скидка"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="остаток"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleAddProduct}>Добавить</button>
      </div>
    </div>
  );
};

export default Newproduct;
