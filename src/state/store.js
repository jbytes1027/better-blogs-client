import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogsReducer from "./blogsReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer
  }
})

export default store
