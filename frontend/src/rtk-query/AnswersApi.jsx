import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const answersApi = createApi({
    reducerPath: "answersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5096/api/answers",
    }),
    tagTypes: ['Answers'], 
    endpoints: (builder) => ({
        getAnswers: builder.query({
            query: (queId) => `/getanswers/${queId}`,
            transformResponse: (response, meta, error) => {
                return response;
            },
            providesTags: ['Answers'], 
        }),
        postAnswer: builder.mutation({
            query: (answerData) => ({
                url: "/postAnswer",
                method: "POST",
                body: answerData,
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
        }),
        editAnswer: builder.mutation({
            query: (answerData) => ({
                url: "/updateanswer",
                method: "PUT",
                body: answerData,
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
        }),
        deleteAnswer: builder.mutation({
            query: (answerId) => ({
                url: `/deleteanswer/${answerId}`,
                method: "DELETE",
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
        }),
    }),
});

export const { useGetAnswersQuery ,useGetApprovalStatusQuery, usePostAnswerMutation, useEditAnswerMutation, useDeleteAnswerMutation } = answersApi;