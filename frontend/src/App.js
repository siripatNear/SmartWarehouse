import React from "react";
import {
  // createBrowserRouter,
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
// import OrderList from './pages/OrderList';
import Login from './pages/Login';
// import PickingList from './pages/PickingList';

import './App.css';
import AddUser from "./pages/AddUser";

import { useSelector } from 'react-redux'


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
        <Route path='/' element={<Login />} />
          <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* //?test routes */}
        <Route path='/add-user' element={<AddUser />} />

        <Route element={<RestrictedRoutes />}>
          <Route path='/login' element={<Login />} />
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
    path: "TablePickingList",
    element: <TablePickingList />,
  },

]);
*/