import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/login";
import questionReducer from "./slice/questions";


import { approvalApi } from "../rtk-query/ApprovalApi";
import { answersApi } from "../rtk-query/AnswersApi";
import { questionsApi } from "../rtk-query/QuestionsApi";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        questions: questionReducer,

        [approvalApi.reducerPath]: approvalApi.reducer,
        [answersApi.reducerPath]: answersApi.reducer,
        [questionsApi.reducerPath]: questionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware()
        .concat(approvalApi.middleware)
        .concat(answersApi.middleware)
        .concat(questionsApi.middleware);
    }

});
