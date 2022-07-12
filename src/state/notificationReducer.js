import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

export const Type = {
  Info: "info",
  Success: "success",
  Error: "error",
}

export const notify = (message, type) => async (dispatch) => {
  dispatch(addNotification(message, type, uuid()))
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
