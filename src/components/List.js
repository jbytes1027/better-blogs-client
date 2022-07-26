const List = (props) => (
  <div className="list">
    {props.children}
  </div>
)

const ListItem = (props) => (
  <div className="list-item" onClick={props.onClick}>
    {props.header &&
      <div className={"list-item-header"}>
        {props.header}
      </div>
    }
    {props.children}
  </div>
)

export { List, ListItem }