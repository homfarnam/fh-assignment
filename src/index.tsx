import ReactDOM from "react-dom/client"
import "./styles/tailwind.css"
import App from "./App"
import React from "react"
import "react-datepicker/dist/react-datepicker.css"
import HotelProvider from "context/Provider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HotelProvider>
    <App />
  </HotelProvider>
)
