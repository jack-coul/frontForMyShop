const initialState = {
  error: null,
  cash: 0,
  login: "",
  token: localStorage.getItem("token"),
  role: "",
  message: "",
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case "getUser/data/pending":
      return {
        ...state,
        loadingUser: true,
      };
    case "getUser/data/fulfilled":
      return {
        ...state,
        cash: action.payload.userData.cash,
        login: action.payload.userData.login,
        token: action.payload.token,
        role: action.payload.userData.role,
        messageLogIn: `Вы вошли как ${action.payload.userData.login}`,
      };
    case "application/signup/pending":
      return {
        ...state,
        signing: true,
        error: null,
      };

    case "application/signup/fulfilled":
      return {
        ...state,
        signing: false,
        message: "вы успешно зарегистрированы",
        role: action.payload,
      };
    case "application/signup/rejected":
      return {
        ...state,
        signing: false,
        error: action.error,
      };
    case "application/signin/pending":
      return {
        ...state,
        signing: true,
        error: null,
      };
    case "application/signin/fulfilled":
      console.log(action.payload.cash);
      return {
        ...state,
        login: action.payload.login,
        cash: action.payload.cash,
        signing: false,
        token: action.payload.token,
        role: action.payload.role,
        messageLogin: `Вы вошли как ${action.payload.login}`,
      };
    case "application/signin/rejected":
      return {
        ...state,
        signing: false,
        error: action.error,
      };
    case "application/signout/pending":
      return {
        ...state,
        signing: true,
        error: null,
      };
    case "application/signout/fulfilled":
      return {
        ...state,
        signing: false,
        token: null,
        role: null,
        message: "Войдите или зарегистрируйтесь",
      };
    case "application/signout/rejected":
      return {
        ...state,
        signing: false,
        error: action.error,
      };
    case "remove/cash/pending":
      return {
        ...state,
        removeCash: true,
        error: null,
      };
    case "remove/cash/fulfilled":
      return {
        ...state,
        removeCash: false,
        cash: action.payload,
      };
    case "remove/cash/rejected":
      return {
        ...state,
        removeCash: false,
        error: action.error,
      };
    case "cash/user/pending":
      return {
        ...state,
        cashing: true,
        error: null,
      };
    case "cash/user/fulfilled":
      return {
        ...state,
        cash: action.payload.resultCash,
        cashing: false,
        messageCash: `Кошелек успешно пополнен на ${action.payload.sumCash}`,
      };
    case "cash/user/rejected":
      return {
        ...state,
        cashing: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getUserData = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "getUser/data/pending" });
    const state = getState();
    try {
      const res = await fetch("http://localhost:4000/oneUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
      });
      const userData = await res.json();
      console.log();
      dispatch({
        type: "getUser/data/fulfilled",
        payload: {
          userData,
          token: state.application.token,
        },
      });
    } catch (error) {
      dispatch({ type: "getUser/data/rejected", error: error });
    }
  };
};

export const signUpFetch = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });
    try {
      await fetch("http://localhost:4000/createUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      dispatch({
        type: "application/signup/fulfilled",
      });
    } catch (error) {
      dispatch({
        type: "application/signup/rejected",
        error: error.toString(),
      });
    }
  };
};

export const signInFetch = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/pending" });
    try {
      const res = await fetch("http://localhost:4000/loginUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const userData = await res.json();
      let role;
      console.log(userData);
      if (userData.error) {
        dispatch({
          type: "application/signin/rejected",
          error: userData.error,
        });
      } else {
        if (login === "admin") {
          role = login;
        } else {
          role = "user";
        }
      }
      dispatch({
        type: "application/signin/fulfilled",
        payload: {
          login,
          token: userData.token,
          role,
          cash: userData.cash,
        },
      });

      localStorage.setItem("token", userData.token);
    } catch (error) {
      dispatch({
        type: "application/signin/rejected",
        error: error.toString(),
      });
    }
  };
};
export const addCashIn = (login, sumCash) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "cash/user/pending" });
    try {
      const res = await fetch(`http://localhost:4000/cashIn`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({ login, cash: sumCash }),
      });
      const resultCash = await res.json();
      console.log(resultCash);
      dispatch({
        type: "cash/user/fulfilled",
        payload: {
          resultCash,
          sumCash,
        },
      });
    } catch (error) {
      dispatch({ type: "cash/user/rejected", error: error });
    }
  };
};

export const removeCash = (finallySum) => {
  return async (dispatch, getState) => {
    const state = getState();
    const newCash = state.application.cash - finallySum;
    dispatch({ type: "remove/cash/pending" });
    try {
      dispatch({ type: "remove/cash/fulfilled", payload: newCash });
    } catch (error) {
      dispatch({ type: "remove/cash/rejected", error: error });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: "application/signout/pending" });
    try {
      dispatch({ type: "application/signout/fulfilled" });
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    } catch (error) {
      dispatch({ type: "application/signout/rejected" });
    }
  };
};

export default application;
