import { createSlice } from '@reduxjs/toolkit'
import {
  deleteAccount,
  logout,
  signInWithGoogle,
  signin,
  signup,
  subscribe,
  updateUser,
  updateUserImg,
} from '../services/userService'

const initialState = {
  currentUser: null,
  loading: false,
  loadingSignup: false,
  error: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) => {
    builder
      // sign in
      .addCase(signin.pending, (state) => {
        state.loading = true
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.error = false
      })
      .addCase(signin.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.payload
      })

      // sign in with Google
      .addCase(signInWithGoogle.pending, (state) => {
        console.log('signin pedning')
        state.loading = true
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        console.log('payload')
        console.log(action.payload)
        state.loading = false
        state.currentUser = action.payload
        state.error = false
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.currentUser = null
        state.error = false
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loadingSignup = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loadingSignup = false
        state.currentUser = action.payload
        state.error = false
      })
      .addCase(signup.rejected, (state, action) => {
        state.loadingSignup = false
        state.error = action.error.message
      })

      // subscription
      .addCase(subscribe.pending, (state) => {
        state.loading = true
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        const subscribedToArr = state.currentUser.subscribedUsers

        if (subscribedToArr.includes(action.payload)) {
          subscribedToArr.splice(
            subscribedToArr.findIndex(
              (channelId) => channelId === action.payload
            ),
            1
          )
        } else {
          subscribedToArr.push(action.payload)
        }
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.currentUser = action.payload
        state.error = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // delete account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.currentUser = null
        state.error = false
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // update profile image
      .addCase(updateUserImg.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserImg.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.currentUser.img = action.payload
        state.error = false
      })
      .addCase(updateUserImg.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
