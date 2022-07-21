import "./index.css"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./state/store"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
