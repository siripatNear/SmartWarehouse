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

// Navvbar
import NavbarGuest from "./components/NavbarGuest";
import NavbarForklift from "./components/NavbarForklift";
import NavbarOperator from "./components/NavbarOperator";
import NavbarAdmin from "./components/NavbarAdmin";
import { useUserStore } from "./store/user";

import Dashboard from "./pages/Dashboard";
import PickingList from "./pages/Operator/PickingList";
import ConfirmPicking from "./pages/Operator/ConfirmPicking";
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
  const user = useUserStore((state) => state.user);
  return (
    <BrowserRouter>
      {selectNavbar(user?.role)}
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* //*Outlet [Need to login before access these routes] */}
          <Route path="/" element={<Dashboard />} />

          {/* //*Admin */}
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/manage-users" element={<UserManage />} />

          {/* //* Operator */}
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/picking-list" element={<PickingList />} />
          <Route path="/history" element={<History />} />

          {/* //* Forklift Put away */}
          <Route path="/put-away" element={<PutAwayItem />} />
          <Route path="/update-mat" element={<UpdateMat />} />

          {/* //*Forklift Picking */}
          <Route path="/picking-order-list" element={<PickingOrderList />} />
          <Route path="/picking-order-detail" element={<PickingOrderDetail />} />

        </Route>

        <Route element={<RestrictedRoutes />}>
          {/* //*Outlet  */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
