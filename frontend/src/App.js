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

import LogIn from "./pages/LogIn";

import AddUser from "./pages/adminRole/AddUser";
import UserManage from "./pages/adminRole/UserManage";

// Forklift_PutAway_Page
import ScanTag from "./pages/Forklift_PutAway/ScanTag";
import UpdateMat from "./pages/Forklift_PutAway/UpdateMat";
import PutAwayItem from "./pages/Forklift_PutAway/PutAwayItem";

// Forklift_Picking_Page
import History from "./pages/ForkliftPicking/History";
import PickingOrderList from "./pages/ForkliftPicking/PickingOrderList";
import PickingOrderDetail from "./pages/ForkliftPicking/PickingOrderDetail";

import RunPage from "./components/Logout";

// Navvbar
import NavbarGuest from "./components/NavbarGuest";
import NavbarForklift from "./components/NavbarForklift";
import NavbarOperator from "./components/NavbarOperator";
import NavbarAdmin from "./components/NavbarAdmin";

import Dashboard from "./pages/Dashboard";
import PickingList from "./pages/Operator/PickingList";
import BoxZone from "./components/BoxZone";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  // if logged in -> go to outlet routes.
  // if not logged in -> go to login page.

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  // if not logged in -> go to outlet routes (login).
  // if logged in -> go to home page.

  return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

// !navbar from role don't delete
const selectNavbar = (role) => {
  switch (role) {
    case "Forklift":
      return <NavbarForklift />;
    case "Operator":
      return <NavbarOperator />;
    case "Admin":
      return <NavbarAdmin />;
    default:
      return <NavbarGuest />;
  }
};

const App = () => {
  // !navbar from role don't delete
  const role = "Admin"; // TODO: fetch from api
  return (
    <BrowserRouter>
      {/* //! navbar from role don't delete*/}
      {selectNavbar(role)}
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* //*Outlet [Need to login before access these routes] */}
          <Route path="/" element={<RunPage />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/manage-users" element={<UserManage />} />
        </Route>

        {/* //?test routes */}
        {/* <Route path="/add-user" element={<AddUser />} /> */}
        {/* <Route path="/usermanage" element={<UserManage />} /> */}
        <Route path="/PutAwayItem" element={<PutAwayItem />} />
        <Route path="/updatemat" element={<UpdateMat />} />

        <Route path="/PickingOrderList" element={<PickingOrderList />} />
        <Route path="/history" element={<History />} />
        <Route path="/ScanTag" element={<ScanTag />} />
        <Route path="/boxzone" element={<BoxZone />} />
        <Route path="/d" element={<Dashboard />} />

        <Route path="/NavbarGuest" element={<NavbarGuest />} />
        <Route path="/NavbarForklift" element={<NavbarForklift />} />
        <Route path="/NavbarOperator" element={<NavbarOperator />} />
        <Route path="/NavbarAdmin" element={<NavbarAdmin />} />

        {/* //?test routes petch */}
        <Route path="/PickingList" element={<PickingList />} />
        <Route path="/putaway" element={<PutAwayItem />} />
        <Route path="/updatemat" element={<UpdateMat />} />

        <Route path="/OrderList" element={<OrderList />} />
        <Route path="/OrderDetail" element={<OrderDetail />} />
        <Route path="/pickingorderdetail" element={<PickingOrderDetail />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route element={<RestrictedRoutes />}>
          {/* //*Outlet  */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
