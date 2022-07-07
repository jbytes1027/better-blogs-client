const Notification = ({ message, success }) => {
  if (message === null) return null

  const failStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20",
    borderStyle: "solid",
    padding: "10",
  }

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20",
    borderStyle: "solid",
    padding: "10",
  }

  const style = success ? successStyle : failStyle

  return (
    <div className="notification" style={style}>
      {message}
    </div>
  )
}

export default Notification
