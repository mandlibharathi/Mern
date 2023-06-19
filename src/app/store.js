import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import actionReducer from '../features/actions/actionSlice'
export const store =configureStore({
 reducer:{
   auth:authReducer,
   actions:actionReducer
 }
})