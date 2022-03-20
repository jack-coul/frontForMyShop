import React from "react";
import Title from "./Title";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Title styles={styles} />
    </header>
  );
};

export default Header;
