/* eslint-disable array-callback-return */
const inittialState = {
  basket: [
    // { id, left, amount, price },
    // { id, left, amount, price},
  ],
  finally: 0,
  error: null,
};

const basket = (state = inittialState, action) => {
  switch (action.type) {
    case "get/basket/pending":
      return {
        ...state,
        getting: true,
        error: null,
      };
    case "get/basket/fulfilled":
      const productInBasketSum = action.payload.basket.products.reduce(
        (finallySum, productInBasket) => {
          action.payload.products.find((product) => {
            if (product._id === productInBasket.id) {
              finallySum += product.price * productInBasket.amount;
            }
          });
          return finallySum;
        },
        0
      );
      return {
        ...state,
        getting: false,
        basket: [...action.payload.basket.products.map((product) => product)],
        finally: productInBasketSum,
      };
    case "get/basket/rejected":
      return {
        ...state,
        getting: false,
        error: action.error,
      };
    case "addproduct/inbasket/pending":
      return {
        ...state,
        productloadInBasket: true,
        error: null,
      };
    case "addproduct/inbasket/fulfilled":
      const id = action.payload._id;
      const left = action.payload.left--;
      const price = action.payload.price;
      return {
        ...state,
        productloadInBasket: false,
        basket: [...state.basket, { id, left, price, amount: 1 }],
        finally: state.finally + price,
      };
    case "addproduct/inbasket/rejected":
      return {
        ...state,
        productloadInBasket: false,
        error: action.error,
      };
    case "deleteproduct/frombasket/pending":
      return {
        ...state,
        productloadInBasket: true,
        error: null,
      };
    case "deleteproduct/inbasket/fulfilled":
      const productInBasket = state.basket.find(
        (product) => product.id === action.payload.id
      );
      // console.log(productInBasket2, productInBasket);
      return {
        ...state,
        productloadInBasket: false,
        basket: [
          ...state.basket.filter((product) => product.id !== action.payload.id),
        ],
        finally: state.basket.reduce((finallySum, productPrice) => {
          if (productPrice.id !== productInBasket.id) {
            finallySum += productPrice.price * productPrice.amount;
          }
          return finallySum;
        }, 0),
      };
    case "deleteproduct/inbasket/rejected":
      return {
        ...state,
        productloadInBasket: false,
        error: action.error,
      };
    case "addamount/productinbasket/pending":
      return {
        ...state,
        productloadInBasket: true,
        error: null,
      };
    case "addamount/productinbasket/fulfilled":
      const productINC = action.payload.products.find(
        (product) => product._id === action.payload.id
      );
      return {
        ...state,
        productloadInBasket: false,
        basket: [
          ...state.basket.map((product) => {
            if (product.id === action.payload.id) {
              if (product.left > 0) {
                product.left -= 1;
                product.amount += 1;
              }
            }
            return product;
          }),
        ],
        finally: state.finally + productINC.price,
      };

    case "addamount/productinbasket/rejected":
      return {
        ...state,
        productloadInBasket: false,
        error: action.error,
      };
    case "removeamount/productinbasket/pending":
      return {
        ...state,
        productloadInBasket: true,
        error: null,
      };
    case "removeamount/productinbasket/fulfilled":
      const productDEC = action.payload.products.find(
        (product) => product._id === action.payload.id
      );
      return {
        ...state,
        productloadInBasket: false,
        basket: [
          ...state.basket.map((product) => {
            if (product.id === action.payload.id) {
              if (product.amount > 1) {
                product.left += 1;
                product.amount -= 1;
              }
            }
            return product;
          }),
        ],
        finally: state.finally - productDEC.price,
      };
    case "removeamount/productinbasket/rejected":
      return {
        ...state,
        productloadInBasket: false,
        error: action.error,
      };
    case "bye/products/pending":
      return {
        ...state,
        byeing: true,
      };
    case "bye/products/fulfilled":
      return {
        ...state,
        basket: [],
        finally: 0,
        byeing: false,
      };
    case "bye/products/rejected":
      return {
        ...state,
        byeing: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getAllProductsInBasket = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "get/basket/pending" });
    try {
      const res = await fetch("http://localhost:4000/basket", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const basket = await res.json();
      dispatch({
        type: "get/basket/fulfilled",
        payload: {
          basket,
          products: state.products.products,
        },
      });
    } catch (error) {
      dispatch({ type: "get/basket/rejected", error: error });
    }
  };
};

export const addProductInBasket = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: "addproduct/inbasket/pending" });
    const state = getState();
    const token = state.application.token;
    try {
      const res = await fetch(
        `http://localhost:4000/addproductinbasket/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productinBasket = await res.json();
      dispatch({
        type: "addproduct/inbasket/fulfilled",
        payload: productinBasket,
      });
    } catch (error) {
      dispatch({ type: "addproduct/inbasket/rejected", error: error });
    }
  };
};

export const deleteProductFromBasket = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: "deleteproduct/frombasket/pending" });
    const state = getState();
    const products = state.products.products;
    const token = state.application.token;

    try {
      await fetch(`http://localhost:4000/deleteProductFromBasket/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "deleteproduct/inbasket/fulfilled",
        payload: {
          products,
          id,
        },
      });
    } catch (error) {
      dispatch({ type: "deleteproduct/inbasket/rejected", error: error });
    }
  };
};

export const byeProducts = (clearOrBye) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.application.token;

    dispatch({ type: "bye/products/pending" });
    try {
      await fetch(`http://localhost:4000/${clearOrBye}`, {
        method: "PATCH",
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "bye/products/fulfilled" });
    } catch (error) {
      dispatch({ type: "bye/products/rejected", error: error });
    }
  };
};

export const addAmountProductinBasket = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.application.token;
    const products = state.products.products;

    dispatch({ type: "addamount/productinbasket/pending" });
    try {
      await fetch(`http://localhost:4000/addAmountProductinBasket/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "addamount/productinbasket/fulfilled",
        payload: {
          products,
          id,
        },
      });
    } catch (error) {
      dispatch({ type: "addamount/productinbasket/rejected", error: error });
    }
  };
};

export const removeAmountProductinBasket = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.application.token;
    const products = state.products.products;

    dispatch({ type: "removeamount/productinbasket/pending" });
    try {
      await fetch(`http://localhost:4000/removeAmountProductinBasket/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "removeamount/productinbasket/fulfilled",
        payload: { id, products },
      });
    } catch (error) {
      dispatch({ type: "removeamount/productinbasket/rejected", error: error });
    }
  };
};

export default basket;
