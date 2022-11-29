import React from "react";
import {
  // createBrowserRouter,
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

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

// Operator
import Dashboard from "./pages/Dashboard";
import ConfirmPicking from "./pages/Operator/ConfirmPicking";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";
import Stock from "./pages/adminRole/Stock";
import HistoryDetail from "./pages/HistoryDetail";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  // if logged in -> go to outlet routes.
  // if not logged in -> go to login page.
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = (role) => {
  const { isAuth } = useSelector((state) => state.auth);
  // if not logged in -> go to outlet routes (login).
  // if logged in -> go to home page.
  // if logged in with Forklift role -> go to picking-order-list page.

  if (role === "Forklift")
    return <>{!isAuth ? <Outlet /> : <Navigate to="/picking-order-list" />}</>;
  else return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
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
          <Route path="/edit-user" element={<AddUser />} />
          <Route path="/manage-users" element={<UserManage />} />
          <Route path="/stock" element={<Stock />} />

          {/* //* Operator */}
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/confirm-picking" element={<ConfirmPicking />} />
          <Route path="/history" element={<History />} />
          <Route path="/history-detail" element={<HistoryDetail />} />

          {/* //* Forklift Put away */}
          <Route path="/scan-tag" element={<ScanTag />} />
          <Route path="/put-away" element={<PutAwayItem />} />
          <Route path="/update-mat" element={<UpdateMat />} />

          {/* //*Forklift Picking */}
          <Route path="/picking-order-list" element={<PickingOrderList />} />
          <Route
            path="/picking-order-detail"
            element={<PickingOrderDetail />}
          />
        </Route>

        <Route element={RestrictedRoutes(user?.role)}>
          {/* //*Outlet  */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
