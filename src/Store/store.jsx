import { configureStore } from "@reduxjs/toolkit";
import whatsappReducer from "./whatsappSlice";

export const store = configureStore({
  reducer: {
    whatsapp: whatsappReducer,
  },
});
