// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./userSlice";
import { sideBarReducer } from "./sideBarSlice";


const store = configureStore({
  reducer: {
    userInfoStore: userInfoReducer,
    sideBarStore: sideBarReducer,
  },
});

export default store;
