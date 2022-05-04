import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
  name: 'currentRoom',
  initialState: {
    value: {
      room: {}, 
      users: [],
      messages: []
    },
  },
  reducers: {
    setRoomValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setRoomValue } = roomSlice.actions

export default roomSlice.reducer
