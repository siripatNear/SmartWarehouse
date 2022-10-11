import React from "react";
import {createBrowserRouter} from "react-router-dom";
import './App.css';
import { useState } from "react";

import PopUp from './components/PopUp';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import LogIn from './pages/LogIn';
import PickingList from './pages/PickingList';

import Search from './components/Search';
import TablePickingList from './components/TablePickingList';
import AddUser from "./components/AddUser";
import UserManage from "./pages/UserManage";


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
    path: "login",
    element: <LogIn />,
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
    path: "TablePickingList",
    element: <TablePickingList/>,
  },
  {
    path: "AddUser",
    element: <AddUser/>,
  },
  {
    path: "UserManage",
    element: <UserManage/>,
  },

]);
