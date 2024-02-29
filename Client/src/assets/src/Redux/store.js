import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slices/AuthSlice"
import courseSliceReducer from "./slices/courseSlice"
import lectureSliceReducer from './slices/LectureSlice'
import razorpaySliceReducer from './slices/RazorpaySlice'
import statSliceReducer from './slices/statsSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpaySliceReducer,
        lecture: lectureSliceReducer,
        stat: statSliceReducer
    },
    devTools: true
});

export default store;