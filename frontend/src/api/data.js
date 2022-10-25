import axios from "axios";
axios.defaults.withCredentials = true;

//Add user
export async function onAddUser(addUserData) {
  return await axios.post("http://localhost:5000/api/add-user", addUserData);
}

export async function onGetAddUserPage() {
  return await axios.get("http://localhost:5000/api/add-user");
}

//Get warehouse's dashboard by warehouse_id
export async function onGetWarehouseDashboard(id) {
  return await axios.get(`http://localhost:5000/api/warehouse/${id}`);
}

//Get Zone's data
export async function onGetItemsByZone() {
  return await axios.get("http://localhost:5000/api/warehouse/:wh_id/:zone_id");
}
