import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import roomReducer from './room'
export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
})