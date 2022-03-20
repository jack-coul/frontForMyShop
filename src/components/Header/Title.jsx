import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Newproduct from "./Newproduct";
import Newcategory from "./Newcategory";
import styles from "./Header.module.css";
import { getUserData, signOut } from "../../redux/features/application";
import basket from "../../assets/basket.png";
import Basket from "./Basket/Basket";
import { addCashIn } from "../../redux/features/application";

const Title = () => {
  const dispatch = useDispatch();

  const { token, role, cash, login, messageLogIn, messageCash, cashing } =
    useSelector((state) => state.application);

  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const [cashModal, setcashModal] = useState(false);
  const [cashMessage, setCashMessage] = useState(false);
  const [sumCash, setSumCash] = useState("");

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleOpenLogoutForm = () => {
    dispatch(signOut());
  };
  const handleAddProduct = () => {
    addCategory && setAddCategory(false);
    addProduct ? setAddProduct(false) : setAddProduct(true);
  };
  const handleAddCategory = () => {
    addCategory ? setAddCategory(false) : setAddCategory(true);
    addProduct && setAddProduct(false);
  };
  const handleOpenBasket = () => {
    if (openBasket) {
      setOpenBasket(false);
    } else {
      setOpenBasket(true);
    }
  };
  const handleAddCashIn = () => {
    dispatch(addCashIn(login, sumCash));
    setcashModal(false);
    setCashMessage(true);
    setTimeout(() => {
      setCashMessage(false);
    }, 2000);
    setSumCash("");
  };
  const handleOpenCashIn = () => {
    cashModal ? setcashModal(false) : setcashModal(true);
  };
  return (
    <div className={styles.Header}>
      <div className={styles.title}>
        <h1 className={styles.myShop}>
          <Link to="/" className={styles.link}>
            SAMSUNG
          </Link>
        </h1>
        <div>
          {token && role === "admin" ? (
            <div className={styles.headerBlock}>
              <div onClick={handleAddProduct} className={styles.addNewProduct}>
                добавить продукт
              </div>
              <div className={styles.addNewProduct} onClick={handleAddCategory}>
                добавить категорию
              </div>
              {addProduct && <Newproduct />}
              {addCategory && <Newcategory />}
              <div>
                <h4 className={styles.messageLogin}>{messageLogIn}</h4>
              </div>
              <div>
                <span
                  onClick={handleOpenLogoutForm}
                  className={styles.buttonLog}
                >
                  Выйти
                </span>
              </div>
            </div>
          ) : token && role === "user" ? (
            <div className={styles.userLK}>
              <div>
                {cashing ? (
                  "loading..."
                ) : (
                  <span>{`На вашем счету ${cash}`}₽</span>
                )}
                <div onClick={handleOpenCashIn} className={styles.cashIn}>
                  Пополнить
                </div>
                {cashModal && (
                  <div className={styles.cash}>
                    <input
                      type="text"
                      value={sumCash}
                      onChange={(e) => setSumCash(e.target.value)}
                      placeholder="0"
                    />
                    <input
                      type="submit"
                      value="Пополнить"
                      disabled={!sumCash}
                      onClick={handleAddCashIn}
                    />
                  </div>
                )}
                {cashMessage &&
                  (cashing ? (
                    "loading..."
                  ) : (
                    <div className={styles.messageCash}>
                      {messageCash}
                      <>₽</>
                    </div>
                  ))}
              </div>

              <div className={styles.basket}>
                <img src={basket} onClick={handleOpenBasket} alt="" />
              </div>
              {openBasket && <Basket setOpenBasket={setOpenBasket} />}
              <div>
                <span>{messageLogIn}</span>
              </div>
              <div>
                <span
                  onClick={handleOpenLogoutForm}
                  className={styles.buttonLog}
                >
                  Выйти
                </span>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className={styles.buttonLog}>
                Войти
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;
