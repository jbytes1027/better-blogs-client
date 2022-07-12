import { createSlice } from "@reduxjs/toolkit"

export const Type = {
  Info: "info",
  Success: "success",
  Error: "error",
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(message, type, id) {
        return {
          payload: {
            message,
            type,
            id,
          },
        }
      },
    },
    removeNotification(state, action) {
      const notificationIndex = state.findIndex((n) => n.id === action.payload)
      state.splice(notificationIndex, 1)
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
