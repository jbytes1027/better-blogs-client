import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import postsReducer from "./postsReducer"
import userReducer from "./userReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    posts: postsReducer,
    user: userReducer,
  },
})

export default store
