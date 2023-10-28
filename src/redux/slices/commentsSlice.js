import { createSlice } from '@reduxjs/toolkit'
import {
  addComment,
  deleteComment,
  fetchComments,
} from '../services/commentService'

const initialState = {
  allComments: [],
  loading: false,
  error: false,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.allComments = action.payload
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false
        state.allComments = [...state.allComments, action.payload]
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false
        state.allComments = state.allComments.filter(
          (comment) => comment._id !== action.payload
        )
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default commentsSlice.reducer
