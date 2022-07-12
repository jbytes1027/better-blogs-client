import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogsReducer from "./blogsReducer"
import userReducer from "./userReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

export default store
