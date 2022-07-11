import { v4 as uuid } from "uuid"
import {
  addNotification,
  removeNotification,
} from "../state/notificationReducer"
import store from "../state/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const notify = (message, type) => {
  store.dispatch(addNotification(message, type, uuid()))
}

const Notification = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state)

  useEffect(() => {
    if (notifications.length > 0) {
      setTimeout(() => {
        dispatch(removeNotification(notifications[0].id))
      }, 3000)
    }
  }, [notifications])

  const baseStyle = {
    color: "black",
    background: "lightgrey",
    fontSize: "20",
    borderStyle: "solid",
    padding: "10",
  }

  const styles = {
    error: {
      ...baseStyle,
      color: "red",
    },
    success: {
      ...baseStyle,
      color: "green",
    },
    info: {
      ...baseStyle,
      color: "blue",
    },
  }

  if (!notifications[0]) {
    return null
  } else {
    return (
      <div className="notification" style={styles[notifications[0].type]}>
        {notifications[0].message}
      </div>
    )
  }
}

export { Type } from "../state/notificationReducer"
export { notify }
export default Notification
