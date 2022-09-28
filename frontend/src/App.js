import React from "react";
// import { createRoot } from "react-dom/client";
// import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import OrderList from './components/OrderList';
import SignIn from './components/SignIn';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "orderlist",
    element: <OrderList />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "navbar",
    element: <Navbar />,
  },
]);
