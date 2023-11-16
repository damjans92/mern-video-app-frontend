import { createSlice } from '@reduxjs/toolkit'
import {
  deleteVideo,
  dislike,
  editVideo,
  fetchMyVideos,
  like,
} from '../services/videoService'

const initialState = {
  currentVideo: null,
  editVideoData: null,
  videoList: [],
  loading: false,
  loadingEdit: false,
  error: false,
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.currentVideo = action.payload
    },
    fetchFailure: (state) => {
      state.loading = false
      state.error = true
    },
    setEditVideoData: (state, action) => {
      state.editVideoData = action.payload
    },

    clearEditVideoData: (state) => {
      state.editVideoData = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(like.pending, (state) => {
        // state.loading = true
      })
      .addCase(like.fulfilled, (state, action) => {
        // state.loading = false
        state.error = null
        if (!state.currentVideo.likes.includes(action.payload)) {
          state.currentVideo.likes.push(action.payload)
          state.currentVideo.dislikes.splice(
            state.currentVideo.dislikes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          )
        } else {
          state.currentVideo.likes.splice(
            state.currentVideo.likes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          )
        }
      })
      .addCase(like.rejected, (state, action) => {
        // state.loading = false
        state.error = action.error.message
      })

      // Dislike video
      .addCase(dislike.pending, (state) => {
        // state.loading = true
      })
      .addCase(dislike.fulfilled, (state, action) => {
        // state.loading = false
        state.error = null
        if (!state.currentVideo.dislikes.includes(action.payload)) {
          state.currentVideo.dislikes.push(action.payload)
          state.currentVideo.likes.splice(
            state.currentVideo.likes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          )
        } else {
          state.currentVideo.dislikes.splice(
            state.currentVideo.dislikes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          )
        }
      })
      .addCase(dislike.rejected, (state, action) => {
        // state.loading = false
        state.error = action.error.message
      })

      // fetch my videos
      .addCase(fetchMyVideos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMyVideos.fulfilled, (state, action) => {
        state.loading = false
        state.videoList = action.payload
      })
      .addCase(fetchMyVideos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // edit video
      .addCase(editVideo.pending, (state) => {
        state.loadingEdit = true
      })
      .addCase(editVideo.fulfilled, (state, action) => {
        state.loadingEdit = false
        state.videoList = state.videoList.map((video) =>
          video._id === action.payload._id ? action.payload : video
        )
      })
      .addCase(editVideo.rejected, (state, action) => {
        state.loadingEdit = false
        state.error = action.error.message
      })

      // delete video
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videoList = state.videoList.filter(
          (video) => video._id !== action.payload
        )
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setEditVideoData,
  clearEditVideoData,
} = videoSlice.actions

export default videoSlice.reducer
