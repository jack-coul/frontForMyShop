import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import products from "./features/products";
import application from "./features/application";
import category from "./features/category";
import basket from "./features/basket";

export const store = createStore(
  combineReducers({ application, products, category, basket }),
  composeWithDevTools(applyMiddleware(thunk))
);
