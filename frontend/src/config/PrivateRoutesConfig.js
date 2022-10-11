import Dashboard from '../pages/Dashboard';
import OrderList from '../pages/OrderList';
import PickingList from '../pages/PickingList';
import SignIn from '../pages/SignIn';
import roles from './Roles';

export const route = [
    {
        path: "/",
        title: 'Dashboard',
        element: <Dashboard />,
        permissions: [
            roles.ADMIN
        ]
    },

    {
        path: "orderlist",
        title: 'Order list',
        element: <OrderList />,
        permissions: [
            roles.ADMIN,
            roles.OPERATOR
        ]
    },
    {
        path: "sign-in",
        title: 'Sign in',
        element: <SignIn />,
        permissions: [
            roles.GUEST,
        ]
    },
    {
        path: "pickinglist",
        title: 'Picking list',
        element: <PickingList />,
        permissions: [
            roles.OPERATOR
        ]
    },
    
]