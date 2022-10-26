import axios from "axios";
axios.defaults.withCredentials = true;

//* for Admin role ONLY
//Add user
export async function onAddUser(addUserData) {
  return await axios.post("http://localhost:5000/add-user", addUserData);
}

export async function onGetAddUserPage() {
  return await axios.get("http://localhost:5000/add-user");
}

//Manage user
// export async function onGetUserList() {
//   return await axios.get("http://localhost:5000/manage-users");
// }

// export async function onDeleteUser() {
//   return await axios.delete("http://localhost:5000/manage-users/:user_id");
// }
