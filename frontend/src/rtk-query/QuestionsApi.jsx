import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionsApi = createApi({
    reducerPath: "questionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5096/api/questions",
    }),
    tagTypes: ['Questions'], 
    endpoints: (builder) => ({
        getQuestionsByUserId: builder.query({
            query: (userId) => `/user/${userId}`,
            transformResponse: (response, meta, error) => {
                return response;
            },
            providesTags: ['Questions'], 
        }),
        getQuestions: builder.query({
            query: () => `/GetQuestions`,
            transformResponse: (response, meta, error) => {
                return response;
            },
            providesTags: ['Questions'], 
        }),
        editQuestions: builder.mutation({
            query: (QuestionsData) => ({
                url: "/updateQuestion",
                method: "PUT",
                body: QuestionsData,
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
            invalidatesTags: ['Questions'],
        }),
        deleteQuestions: builder.mutation({
            query: (QuestionsId) => ({
                url: `/deletequestion/${QuestionsId}`,
                method: "DELETE",
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
            invalidatesTags: ['Questions'],
        }),
        toggleConversation : builder.mutation({
            query: (QuestionsId) => ({
                url: `/toggleConvoEnded/${QuestionsId}`,
                method: "GET",
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
            invalidatesTags: ['Questions'],
        }),
    }),
});
export const { useGetQuestionsQuery ,useGetQuestionsByUserIdQuery, useDeleteQuestionsMutation, useEditQuestionsMutation, useToggleConversationMutation } = questionsApi;