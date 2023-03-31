import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = todosAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (responseData) => {
        return todosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Todos", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Todos", id })),
      ],
    }),

    updateTodos: builder.mutation({
      query: ({ todoId, test }) => ({
        url: `/todos/${todoId}`,
        method: "PUT",
        //body holds the actual object which will be appended
        body: { ...test },
      }),

      //the code below is for optimistic update
      async onQueryStarted({ todoId, test }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const putResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getTodos",
            undefined,
            (draft) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const todo = draft.entities[todoId];
              if (todo) todo.completed = test.completed;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          //in case of error the change in the cached state would get reverted.
          putResult.undo();
        }
      },
    }),
  }),
});

export const { useGetTodosQuery, useUpdateTodosMutation } = extendedApiSlice;

const selectTodosResult = extendedApiSlice.endpoints.getTodos.select();

const selectTodosData = createSelector(
  selectTodosResult,
  (todosResult) => todosResult.data
);

export const { selectAll, selectIds, selectById } = todosAdapter.getSelectors(
  (state) => selectTodosData(state) ?? initialState
);
