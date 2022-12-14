import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: { deleteId: null },
  resources: { deleteId: null },
};

export const ReducerSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    deleteArticleAction: (state, action) => {
      state.articles.deleteId = action.payload;
    },
    deleteResourceAction: (state, action) => {
      state.resources.deleteId = action.payload;
    },
  },
});

export const { deleteArticleAction, deleteResourceAction } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;
