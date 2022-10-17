import React from "react";
import {
  // createBrowserRouter,
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import "./App.css";

import { useSelector } from "react-redux";
import "./App.css";
import { useState } from "react";

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
import PickingOrderList from "./pages/ForkliftPicking/PickingOrderList";
import RunPage from "./components/Logout";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  // if not logged in -> go to outlet routes (login).
  // if logged in -> go to home page.

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* //*Outlet [Need to login before access these routes] */}
          <Route path="/dashboard" element={<RunPage />} />
        </Route>

        {/* //?test routes */}
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/UserManage" element={<UserManage />} />
        <Route path="/PickingOrderList" element={<PickingOrderList />} />

        <Route element={<RestrictedRoutes />}>
          {/* //*Outlet  */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
