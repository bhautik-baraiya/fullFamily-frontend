import { configureStore } from "@reduxjs/toolkit";
import updateReducer from "./updateReducer";

export default configureStore({
  reducer: {
    Update: updateReducer,
  },
});

