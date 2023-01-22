import {
  registerType, loginType, getProfileType, updateProfileType,
  getProfileAction,
  registerUserAction,
  updateProfileAction,
  userLoginAction
} from './userActions'
// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

export interface StateReducerInterface {
  loading: boolean
  error: any
  success: boolean
  userInfo: any | null
  userToken: string | null
  lastAction: string | null
}

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken') ?? null

const initialState: StateReducerInterface = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  lastAction: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.lastAction = 'user/logout'
    }
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true
      state.error = null
      state.lastAction = registerType
    })

    builder.addCase(registerUserAction.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.info
      state.userToken = payload.access_token
      state.lastAction = registerType
    })

    builder.addCase(registerUserAction.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.lastAction = registerType
    })

    // login
    builder.addCase(userLoginAction.pending, (state) => {
      state.loading = true
      state.error = null
      state.lastAction = loginType
    })
    builder.addCase(userLoginAction.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.info
      state.userToken = payload.access_token
      state.lastAction = loginType
    })
    builder.addCase(userLoginAction.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.lastAction = loginType
    })

    // getProfile
    builder.addCase(getProfileAction.pending, (state) => {
      state.loading = true
      state.error = null
      state.lastAction = getProfileType
    })
    builder.addCase(getProfileAction.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.info
      state.lastAction = getProfileType
    })
    builder.addCase(getProfileAction.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.lastAction = getProfileType
    })
    // updateProfile
    builder.addCase(updateProfileAction.pending, (state) => {
      state.loading = true
      state.error = null
      state.lastAction = updateProfileType
    })
    builder.addCase(updateProfileAction.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.info
      state.lastAction = updateProfileType
    })
    builder.addCase(updateProfileAction.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.lastAction = updateProfileType
    })
  }
})
export default userSlice.reducer
