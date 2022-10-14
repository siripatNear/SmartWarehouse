import React from "react";
import {
  // createBrowserRouter,
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import './App.css';

import { useSelector } from 'react-redux'
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


const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn />} />
          <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* //?test routes */}
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/usermanage' element={<UserManage />} />
        <Route path='/putaway' element={<PutAwayItem />} />
        <Route path='/updatemat' element={<UpdateMat />} />

        <Route element={<RestrictedRoutes />}>
          <Route path='/login' element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

/*

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
<<<<<<< HEAD
=======
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
>>>>>>> 9b8d87b608e266af3cde6ab4d5d84dc0a2969c98
  },
]);
*/