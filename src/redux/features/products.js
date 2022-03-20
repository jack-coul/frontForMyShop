const initialState = {
  products: [],
  error: null,
};
const products = (state = initialState, action) => {
  switch (action.type) {
    case "products/get/pending":
      return {
        ...state,
        loadTheProducts: true,
        error: null,
      };
    case "products/get/fulfilled":
      return {
        ...state,
        loadTheProducts: false,
        products: [...action.payload],
      };
    case "products/get/rejected":
      return {
        loadTheProducts: false,
        error: action.error,
      };
    case "products/add/pending":
      return {
        ...state,
        loadTheProducts: true,
        error: null,
      };
    case "product/add/fulfilled":
      return {
        ...state,
        products: [...state.products, action.payload],
        loadTheProducts: false,
      };
    case "product/add/rejected":
      return {
        loadTheProducts: false,
        error: action.error,
      };
    case "products/edit/pending":
      return {
        ...state,

        loadTheProducts: true,
        error: null,
      };
    case "product/edit/fulfilled":
      return {
        ...state,
        loadTheProducts: false,
        products: [...state.products],
        message: action.payload,
      };
    case "product/edit/rejected":
      return {
        loadTheProducts: false,
        error: action.error,
      };
    case "products/delete/pending":
      return {
        ...state,
        loadTheProducts: true,
        error: null,
      };
    case "product/delete/fulfilled":
      return {
        ...state,
        loadTheProducts: false,
        products: [
          ...state.products.filter((product) => {
            if (product._id !== action.payload) {
              return product;
            }
          }),
        ],
      };
    case "product/delete/rejected":
      return {
        loadTheProducts: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: "products/get/pending" });
    try {
      const res = await fetch("http://localhost:4000/products");
      const products = await res.json();
      dispatch({ type: "products/get/fulfilled", payload: products });
    } catch (error) {
      dispatch({ type: "products/get/rejected", error: error.toString() });
    }
  };
};

export const addProduct = (image, category, name, price, oldPrice, left) => {
  // console.log(image, category, name, price, oldPrice, left);
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "product/add/pending" });
    try {
      const res = await fetch("http://localhost:4000/admin/product", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({ image, category, name, price, oldPrice, left }),
      });
      const product = await res.json();
      dispatch({ type: "product/add/fulfilled", payload: product });
    } catch (error) {
      dispatch({ type: "products/add/rejected", error: error.toString() });
    }
  };
};

export const editProduct = (
  id,
  image,
  category,
  name,
  price,
  oldPrice,
  left
) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "product/edit/pending" });
    try {
      await fetch(`http://localhost:4000/admin/product/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({
          id,
          image,
          category,
          name,
          price,
          oldPrice,
          left,
        }),
      });
      dispatch({
        type: "product/edit/fulfilled",
        payload: { id, image, category, name, price, oldPrice, left },
      });
    } catch (error) {
      dispatch({ type: "product/edit/rejected", error: error.toString() });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "product/delete/pending" });
    try {
      const res = await fetch(`http://localhost:4000/admin/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      console.log(await res.json());
      dispatch({ type: "product/delete/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "product/delete/rejected", error: error.toString() });
    }
  };
};

export default products;
