import axios from "axios";
axios.defaults.withCredentials = true;

//Get warehouse's dashboard by warehouse_id
export async function onGetWarehouseDashboard(id) {
  return await axios.get(`http://localhost:5000/warehouse/${id}`);
}

//* for Operator role ONLY
//Get Zone's data
export async function onGetItemsByZone() {
  return await axios.get("http://localhost:5000/warehouse/:wh_id/:zone_id");
}
