import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import autheducer, { authActions } from "./auth.slice";
const actions = {
  auth: authActions,
};

const reducers = {
  auth: autheducer,
};

const store = configureStore({
  reducer: reducers,
});

export type TStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { Provider, useDispatch, useSelector, actions };

export default store;
