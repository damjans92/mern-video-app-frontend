import { toast } from 'react-toastify'
import axiosInstance from '../../api'
import { createAsyncThunk } from '@reduxjs/toolkit'

// fetch video comments
export const fetchComments = createAsyncThunk(
  'commentSlice/fetchComments',
  async ({ videoId }) => {
    try {
      const res = await axiosInstance.get(`comments/${videoId}`)
      return res.data
    } catch (error) {
      toast.error('Error when fetching comments')
    }
  }
)

// add new comment
export const addComment = createAsyncThunk(
  'commentSlice/addComment',
  async ({ currentUserId, videoId, newComment }) => {
    try {
      const res = await axiosInstance.post(
        `comments`,
        {
          userId: currentUserId,
          videoId,
          desc: newComment,
        },
        {
          withCredentials: true,
        }
      )
      return res.data
    } catch (error) {
      toast.error('Error when trying to add a comment')
    }
  }
)

// delete a comment
export const deleteComment = createAsyncThunk(
  'commentSlice/deleteComment',
  async ({ commentId }) => {
    try {
      const res = await axiosInstance.delete(`comments/${commentId}`, {
        withCredentials: true,
      })
      return commentId
    } catch (error) {
      toast.error('Error when trying to delete a comment')
    }
  }
)
