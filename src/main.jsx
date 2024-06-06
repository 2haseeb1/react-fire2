import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import FirebaseProvider from "./firebase provider/FirebaseProvider";
import Root from "./components/Root";
import Home from "./Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element:<Home></Home>
        
      },
      {
        path: "/login",
        element:<Login></Login>
        
      },
      {
        path: "/register",
        element:<Register></Register>
        
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider name="john">
    <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>
);