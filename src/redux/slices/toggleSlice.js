import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openSearchMobile: false,
  openNavMobile: false,
  openEditVideo: false,
  openUpload: false,
  darkMode: true,
}

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode
    },
    toggleSearchOn: (state) => {
      state.openSearchMobile = true
    },
    toggleSearchOff: (state) => {
      state.openSearchMobile = false
    },
    toggleNavMobile: (state, action) => {
      state.openNavMobile = action.payload
    },
    toggleEditVideo: (state, action) => {
      state.openEditVideo = action.payload
    },
    toggleOpenUpload: (state, action) => {
      state.openUpload = action.payload
    },
  },
})

export const {
  toggleDarkMode,
  toggleSearchOn,
  toggleSearchOff,
  toggleNavMobileOn,
  toggleNavMobileOff,
  toggleNavMobile,
  toggleEditVideo,
  toggleOpenUpload,
} = toggleSlice.actions

export default toggleSlice.reducer
