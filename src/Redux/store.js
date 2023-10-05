import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from './slices/courseSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer
    },
    devTools: true
});

export default store;