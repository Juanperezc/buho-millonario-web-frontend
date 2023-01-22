import {
  CloseAccountInterface,
  ForgotPasswordInterface,
  ResetPasswordInterface,
  SignInUserInterface,
  SignUpUserInterface,
  UpdateProfileInterface
} from '@interfaces/forms/user.interface'
import { axiosInstance } from 'config/http'

export const signUp = async <T>(data: SignUpUserInterface) => {
  return await axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + '/auth/sign-up',
    data
  )
}

export const signIn = async <T>(data: SignInUserInterface) => {
  return await axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + '/auth/sign-in',
    data
  )
}

export const getProfile = async <T>() => {
  return await axiosInstance.get<T>(process.env.REACT_APP_BASE_URL + '/auth/profile')
}

export const updateProfile = async <T>(data: UpdateProfileInterface) => {
  return await axiosInstance.put<T>(
    process.env.REACT_APP_BASE_URL + '/auth/profile',
    data
  )
}

export const forgotPassword = async <T>(data: ForgotPasswordInterface) => {
  return await axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + '/auth/forgot-password',
    data
  )
}

export const resetPassword = async <T>(data: ResetPasswordInterface) => {
  return await axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + '/auth/reset-password',
    data
  )
}

export const closeMyAccount = async <T>(data: CloseAccountInterface) => {
  return await axiosInstance.post<T>(
    process.env.REACT_APP_BASE_URL + '/auth/close-account',
    data
  )
}
