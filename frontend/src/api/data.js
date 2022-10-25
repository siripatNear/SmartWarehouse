import axios from 'axios';
axios.defaults.withCredentials = true;

//Get warehouse's dashboard by warehouse_id
export async function onGetWarehouseDashboard(){
    return await axios.get(
        'http://localhost:5000/warehouse/:id')
}

//* for Admin role ONLY
//Add user
export async function onAddUser(addUserData){
    return await axios.post(
        'http://localhost:5000/add-user', addUserData)
}

export async function onGetAddUserPage(){
    return await axios.get(
        'http://localhost:5000/add-user')
}

//* for Operator role ONLY
//Get Zone's data
export async function onGetItemsByZone(){
    return await axios.get(
        'http://localhost:5000/warehouse/:wh_id/:zone_id')
}