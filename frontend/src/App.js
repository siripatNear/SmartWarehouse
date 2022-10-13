import React from "react";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import PopUp from "./components/PopUp";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import TablePickingList from "./components/TablePickingList";

import Dashboard from "./pages/Dashboard";
import OrderList from "./pages/OrderList";
import LogIn from "./pages/LogIn";
import PickingList from "./pages/Operator/PickingList";
import OrderDetail from "./pages/OrderDetail";

import AddUser from "./pages/adminRole/AddUser";
import UserManage from "./pages/adminRole/UserManage";

// Forklift_PutAway_Page
import ScanTag from "./pages/Forklift_PutAway/ScanTag";
import UpdateMat from "./pages/Forklift_PutAway/UpdateMat";
import PutAwayItem from "./pages/Forklift_PutAway/PutAwayItem";
import NavbarAdmin from "./components/NavbarAdmin";

function App() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="App">
      <button
        className="stupidbtn"
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
    path: "orderdetail",
    element: <OrderDetail />,
  },
  {
    path: "TablePickingList",
    element: <TablePickingList />,
  },
  {
    path: "AddUser",
    element: <AddUser />,
  },
  {
    path: "UserManage",
    element: <UserManage />,
  },
  {
    path: "scantag",
    element: <ScanTag />,
  },
  {
    path: "updatemat",
    element: <UpdateMat />,
  },
  {
    path: "putawayitem",
    element: <PutAwayItem />,
  },
  {
    path: "navbaradmin",
    element: <NavbarAdmin />,
  },
]);
