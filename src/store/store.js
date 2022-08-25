import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import doctorSlice from "./doctor/doctorSlice";
import merchantSlice from "./merchant/merchantSlice";
import userSharedSlice from "./userShared/userSharedSlice";
import loginSlice from "./login/loginSlice";
import auth from "./auth/authSlice";
import getTaskSlice from "./task/taskSlice";
import categorySlice from "./category/categorySlice";

export const store = configureStore({
  middleware: (applyMiddleware) =>
    applyMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    doctorSlice,
    merchantSlice,
    userSharedSlice,
    loginSlice,
    auth,
    getTaskSlice,
    categorySlice,
  },
});
