import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const approvalApi = createApi({
    reducerPath: "approvalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5096/api/approval",
    }),
    tagTypes: ['Approval'],
    endpoints: (builder) => ({
        getApprovalStatus: builder.query({
            query: (userId) => ({
                url: `/getApprovalStatus/${userId}`,
                method: "GET",
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
            providesTags: ['Approval'],
        }),
        getAllApprovalStatus: builder.query({
            query: () => ({
                url: `/getAllApprovals`,
                method: "GET",
            }),
            transformResponse: (response, meta, error) => {
                return response;
            },
            providesTags: ['Approval'],
        }),
        grantApproval: builder.mutation({
            query: (grantApprovalData) => ({
                url: '/grantApproval',
                method: "POST",
                body: grantApprovalData
            }),
            invalidatesTags: ['Approval'],
        }),
        revokeApproval: builder.query({
            query: (userId) => ({
                url: `/revokeApproval/${userId}`,
                method: "GET",
            }),
            invalidatesTags: ['Approval'],
        }),
    }),
});

export const { useGetApprovalStatusQuery, useGetAllApprovalStatusQuery, useGrantApprovalMutation, useLazyRevokeApprovalQuery } = approvalApi;