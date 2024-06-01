import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlide'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})