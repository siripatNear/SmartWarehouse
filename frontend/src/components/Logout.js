import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProtectedInfo, onLogout } from '../api/auth';
import Dashboard from '../pages/Dashboard';
import { unauthenticateUser } from '../redux/slices/authSlice';

export default function RunPage() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [protectedData, setProtectedData] = useState(null);

    const logout = async () => {
        try {

            await onLogout();

            dispatch(unauthenticateUser()); //set isAuth = false
            localStorage.removeItem('isAuth');

        } catch (error) {
            console.log(error.response);
        }
    }

    // *cookie
    const protectedInfo = async () => {
        try {
            const { data } = await fetchProtectedInfo();

            setProtectedData(data.info);
            setLoading(false);

        } catch (error) {

            logout();
            
        }
    }

    return loading ? (
        <h1> Loading... </h1>
    ):(
        <center>

        <button onClick={()=> logout()}>
            logout
        </button>
        
        <Dashboard/>

        
        </center>
    )
}