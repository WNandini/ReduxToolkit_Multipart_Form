import { configureStore } from "@reduxjs/toolkit";
import FormDataSlice from "./formDataSlice";

export const store = configureStore({
    reducer: {
        FormDataSlice: FormDataSlice
    }
})