import { removeNotification } from "../state/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const Notification = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications)

  useEffect(() => {
    if (notifications.length > 0) {
      setTimeout(() => {
        dispatch(removeNotification(notifications[0].id))
      }, 3000)
    }
  }, [notifications, dispatch])

  if (!notifications[0]) {
    return null
  } else {
    return (
      <div
        id="notification"
        className={`notification-${notifications[0].type}`}
      >
        {notifications[0].message}
      </div>
    )
  }
}

export default Notification
