import { toast } from 'react-toastify'
import axiosInstance from '../../api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase'
import {
  deleteFirebaseUser,
  signInWithFirebase,
  signOutWithFirebase,
  signUpWithFirebase,
  updateFirebaseEmail,
  updateFirebaseProfile,
} from '../../firebase/firebaseAuth'

// sign in
export const signin = createAsyncThunk(
  'userSlice/signin',
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        'auth/signin',
        {
          name,
          password,
        },
        { withCredentials: true }
      )

      if (res.status === 200) {
        // Firebase sign in
        const email = res.data.email
        try {
          const user = await signInWithFirebase(email, password)
        } catch (firebaseError) {
          toast.error(firebaseError.message)
        }
      }
      return res.data
    } catch (err) {
      if (err.response.status === 404) {
        toast.error('You entered wrong credentials!')
      }

      return rejectWithValue(err.message)
    }
  }
)

// sign in with Google
export const signInWithGoogle = createAsyncThunk(
  'userSlice/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const resFb = await signInWithPopup(auth, provider)
      const user = resFb.user
      const res = await axiosInstance.post(
        'auth/google',
        {
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        },
        {
          withCredentials: true,
        }
      )

      return res.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// logout
export const logout = createAsyncThunk(
  'userSlice/logout',
  async ({ navigate }, { rejectWithValue }) => {
    console.log('logout')
    try {
      const res = await axiosInstance.post(
        `auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      if (res.status === 200) {
        await signOutWithFirebase()
        navigate('/')
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// signup
export const signup = createAsyncThunk(
  'userSlice/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        'auth/signup',
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      if (res.status === 200) {
        // Firebase sign up
        try {
          const user = await signUpWithFirebase(email, password)
        } catch (firebaseError) {
          toast.error(firebaseError.message)
        }
      }
      toast.success('Signed up successfully! You can now sign in.')
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// delete user account
export const deleteAccount = createAsyncThunk(
  'userSlice/deleteAccount',
  async ({ currentUserId, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const mernResponse = await axiosInstance.delete(
        `users/${currentUserId}`,
        {
          withCredentials: true,
        }
      )
      if (mernResponse.status === 200) {
        // After deletion from database delete from firebase
        await deleteFirebaseUser()

        dispatch(logout({ navigate }))
        toast.success('Account deleted successfully.')
      } else {
        toast.error('Error deleting user from MERN database')
      }
    } catch (error) {
      toast.error('Error deleting user:', error.message)
    }
  }
)

// subscribe to a channel
export const subscribe = createAsyncThunk(
  'userSlice/subscribe',
  async ({ channelId, currentUser }, { rejectWithValue }) => {
    try {
      const subUrl = `users/sub/${channelId}`
      const unsubUrl = `users/unsub/${channelId}`
      const isSubscribed = currentUser.subscribedUsers.includes(channelId)
      await axiosInstance.put(
        isSubscribed ? unsubUrl : subUrl,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      return channelId
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// update user info
export const updateUser = createAsyncThunk(
  'userSlice/updateUser',
  async ({ currentUser, updateData }, { rejectWithValue }) => {
    try {
      const promises = []
      const existingEmail = currentUser.email
      const newEmail = updateData.updatedEmail
      const existingName = currentUser.name
      const newName = updateData.updatedUsername

      // Update firebase email or profile
      if (newEmail !== existingEmail) {
        promises.push(updateFirebaseEmail(newEmail))
      }
      if (newName !== existingName) {
        promises.push(updateFirebaseProfile(newName))
      }

      Promise.all(promises)
        .then(() => {
          // toast.success('All upodates completed')
        })
        .catch((error) => {
          toast.error(error.message)
        })

      const res = await axiosInstance.put(
        `users/${currentUser._id}`,
        {
          name: updateData.updatedUsername,
          email: updateData.updatedEmail,
          desc: updateData.updatedDesc,
        },
        { withCredentials: true }
      )
      if (res.status == 200) {
        toast.success('Account details updated!')
      }

      return res.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// update profile image in database
export const updateUserImg = createAsyncThunk(
  'userSlice/updateUserImg',
  async ({ currentUserId, downloadURL }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `users/${currentUserId}`,
        {
          img: downloadURL,
        },
        { withCredentials: true }
      )
      console.log('uploadovao')
      return res.data.img
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
