import React from "react";
// import { createRoot } from "react-dom/client";
// import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import './App.css';
import { useState } from "react";
// import TestBackend from './TestBackend';
// import SignIn from './components/SignIn';
import PopUp from './components/PopUp';

import Navbar from './components/Navbar';
import Home from './components/Home';
import OrderList from './components/OrderList';
import SignIn from './components/SignIn';

function App() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="App">
      {/* <TestBackend/> */}
      {/* <SignIn /> */}
      {/* <h1>Hey, my name is Pathomporn.♥</h1> */}
      <button
        className='stupidbtn'
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        button
      </button>
      {openPopup && <PopUp closePopUp={setOpenPopup} />}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "app",
    element: <App />,
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
