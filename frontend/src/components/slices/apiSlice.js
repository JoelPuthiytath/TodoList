import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5050",
});

const TODO_URL = "/api/todo";
export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getTodos: builder.mutation({
      query: (data) => ({
        url: `${TODO_URL}/`,
        method: "GET",
      }),
    }),
    addTodos: builder.mutation({
      query: (data) => ({
        url: `${TODO_URL}/item`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${TODO_URL}/deleteTask`,
        method: "DELETE",
        params: data,
      }),
    }),
    updateTodos: builder.mutation({
      query: (data) => ({
        url: `${TODO_URL}/updateTask`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTodosMutation,
  useAddTodosMutation,
  useDeleteTaskMutation,
  useUpdateTodosMutation,
} = apiSlice;
