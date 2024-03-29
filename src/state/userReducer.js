import { createSlice } from "@reduxjs/toolkit"
import { LoggedInUserLocalStorageKey } from "../config"
import UserService from "../services/users"

/*
username,
user,
tolken,
*/

const logout = () => async (dispatch) => {
  window.localStorage.removeItem(LoggedInUserLocalStorageKey)
  dispatch(setUser(null))
}

const login = (user) => async (dispatch) => {
  window.localStorage.setItem(LoggedInUserLocalStorageKey, JSON.stringify(user))
  dispatch(setUser(user))
}

const tryLoginFromSaved = () => async (dispatch) => {
  let storedUser = JSON.parse(
    window.localStorage.getItem(LoggedInUserLocalStorageKey)
  )

  // verify stored user exists
  try {
    await UserService.getUser(storedUser?.id)
  } catch {
    storedUser = null
  }

  dispatch(setUser(storedUser))
}

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export { logout, login, tryLoginFromSaved }
export default userSlice.reducer
