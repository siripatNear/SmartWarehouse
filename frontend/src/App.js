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

import LogIn from "./pages/LogIn";

import AddUser from "./pages/adminRole/AddUser";
import UserManage from "./pages/adminRole/UserManage";

// Forklift_PutAway_Page
import PickingOrderList from "./pages/ForkliftPicking/PickingOrderList";
import RunPage from "./components/Logout";

// Navvbar
import NavbarGuest from "./components/NavbarGuest";
import NavbarFolklift from "./components/NavbarFolklift";
import NavbarOperator from "./components/NavbarOperator";
import NavbarAdmin from "./components/NavbarAdmin";
import ScanTag from "./pages/Forklift_PutAway/ScanTag";
import PutAway from "./pages/Forklift_PutAway/PutAwayItem";
import UpdateMat from "./pages/Forklift_PutAway/UpdateMat";

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
        <Route path="/usermanage" element={<UserManage />} />
        <Route path="/putaway" element={<PutAway />} />
        <Route path="/updatemat" element={<UpdateMat />} />
        <Route path="/PickingOrderList" element={<PickingOrderList />} />
        <Route path="/ScanTag" element={<ScanTag />} />

        <Route path="/NavbarGuest" element={<NavbarGuest />} />
        <Route path="/NavbarFolklift" element={<NavbarFolklift />} />
        <Route path="/NavbarOperator" element={<NavbarOperator />} />
        <Route path="/NavbarAdmin" element={<NavbarAdmin />} />

        <Route element={<RestrictedRoutes />}>
          {/* //*Outlet  */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
