import React from "react";
import {createBrowserRouter} from "react-router-dom";
import './App.css';
import { useState } from "react";

import PopUp from './components/PopUp';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OrderList from './pages/OrderList';
import SignIn from './pages/SignIn';
import PickingList from './pages/PickingList';

function App() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="App">
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
  {
    path: "pickinglist",
    element: <PickingList />,
  },
]);
