import axios from 'axios';
axios.defaults.withCredentials = true;

export async function onAddUser(addUserData){
    return await axios.post(
        'http://localhost:5000/api/add-user', addUserData)
}

export async function onLogin(loginData){
    return await axios.post(
        'http://localhost:5000/api/login', loginData)
}

export async function fetchProtectedInfo(){
    return await axios.post(
        'http://localhost:5000/api/protected')
}