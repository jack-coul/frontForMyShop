const initialState = {
  category: [],
  error: null,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case "category/get/pending":
      return {
        ...state,
        loadCategory: true,
        error: null,
      };
    case "category/get/fulfilled":
      return {
        ...state,
        loadCategory: false,
        category: [...action.payload],
      };
    case "categoty/get/rejected":
      return {
        loadCategory: false,
        error: action.error,
      };
    case "category/add/pending":
      return {
        ...state,
        loadCategory: true,
        error: null,
      };
    case "category/add/fulfilled":
      return {
        ...state,
        loadCategory: false,
        category: [...state.category, action.payload],
      };
    case "categoty/add/rejected":
      return {
        loadCategory: false,
        error: action.error,
      };
    case "category/delete/pending":
      return {
        ...state,
        loadCategory: true,
        error: null,
      };
    case "category/delete/fulfilled":
      return {
        ...state,
        loadCategory: false,
        category: [
          ...state.category.filter(
            (category) => category._id !== action.payload
          ),
        ],
      };
    case "categoty/delete/rejected":
      return {
        loadCategory: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getCategory = () => {
  return async (dispatch) => {
    dispatch({ type: "category/get/pending" });
    try {
      const res = await fetch("http://localhost:4000/category");
      const category = await res.json();
      dispatch({ type: "category/get/fulfilled", payload: category });
    } catch (error) {
      dispatch({ type: "category/get/rejected", error: error.toString() });
    }
  };
};
export const addCategory = (name) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "category/add/pending" });
    try {
      const res = await fetch("http://localhost:4000/admin/category", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({ name }),
      });
      const category = await res.json();
      dispatch({ type: "category/add/fulfilled", payload: category });
    } catch (error) {
      dispatch({ type: "category/add/rejected", error: error.toString() });
    }
  };
};
export const editCategory = (id, name) => {
  return async (dispatch) => {
    dispatch({ type: "category/edit/pending" });
    try {
      await fetch(`http://localhost:4000/admin/category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      dispatch({ type: "category/edit/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "category/edit/rejected", error: error.toString() });
    }
  };
};
export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "category/delete/pending" });
    try {
      const a = await fetch(`http://localhost:4000/admin/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      dispatch({ type: "category/delete/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "category/delete/rejected", error: error.toString() });
    }
  };
};

export default category;
