import { toast } from 'react-toastify'
import axiosInstance from '../../api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteFile } from '../../firebase/firebaseStorage'

export const fetchMyVideos = createAsyncThunk(
  'videoSlice/fetchMyVideos',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('videos/findmyvideos', {
        withCredentials: true,
      })

      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editVideo = createAsyncThunk(
  'videoSlice/editVideo',
  async ({ inputs, tags, editVideoData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `videos/${editVideoData._id}`,
        {
          title: inputs.title,
          desc: inputs.desc,
          tags: tags,
          visibility: inputs.visibility,
        },
        { withCredentials: true }
      )

      toast.success('Video edited successfully!')
      return res.data
    } catch (error) {
      toast.error('Error while editing video')
    }
  }
)

// delete a video
export const deleteVideo = createAsyncThunk(
  'videoSlice/deleteVideo',
  async ({ videoId, imgUrl, videoUrl }, { rejectWithValue }) => {
    try {
      console.log('delete service')
      const videoFileUrl = videoUrl
      const imageFileUrl = imgUrl
      // Delete the file
      const deleteVideo = deleteFile(videoFileUrl)
      const deleteImage = deleteFile(imageFileUrl)

      Promise.all([deleteVideo, deleteImage])
        .then(async () => {
          const res = await axiosInstance.delete(`videos/${videoId}`, {
            withCredentials: true,
          })
          console.log(res.data)

          toast.success('Video deleted successfully!')
        })
        .catch((error) => {
          toast.error(error)
        })
      return videoId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// like a video
export const like = createAsyncThunk(
  'videoSlice/like',
  async ({ currentUserId, currentVideoId }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(
        `users/like/${currentVideoId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      return currentUserId
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.message)
    }
  }
)

// dislike a video
export const dislike = createAsyncThunk(
  'videoSlice/dislike',
  async ({ currentUserId, currentVideoId }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(
        `users/dislike/${currentVideoId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      return currentUserId
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.message)
    }
  }
)
