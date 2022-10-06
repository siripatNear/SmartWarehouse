import React from "react";
import {createBrowserRouter} from "react-router-dom";
import './App.css';
import { useState } from "react";

import PopUp from './components/PopUp';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import SignIn from './pages/SignIn';
import PickingList from './pages/PickingList';
import OrderDetail from './pages/OrderDetail';

import Search from './components/Search';


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
    element: <Dashboard />,
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
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "popup",
    element: <PopUp />,
  },
  {
    path: "orderdetail",
    element: <OrderDetail />,
  },

]);
