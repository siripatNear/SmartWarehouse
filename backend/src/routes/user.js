const { Router } = require("express");
const router = Router();

const {
  getUsers,
  addUser,
  getUserByID,
  updateUser,
  deleteUser,
} = require("../controllers/auth");
const { registerValidation } = require("../validators/auth");
const { userAuth, authPage } = require("../middlewares/auth-middleware");
const {
  getForm,
  fetchData,
  fetchFilterItems,
  getStock,
  addItem,
} = require("../controllers/data");
const {
  createOrder,
  getCurrentOrder,
  getCompletedOrder,
  deleteOrder,
  getOrderDetail,
} = require("../controllers/orderManagement");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { startOrder, updateItem, validateItem, findPosition, getUpdateItemForm, updateUsedItem, finishPutAway } = require("../controllers/forklift");

router.get(
  "/warehouse/:wh_id",
  userAuth,
  authPage(["Admin", "Operator"]),
  fetchData,
  fetchFilterItems
);

//========Admin routes=============
router.get("/add-user", userAuth, authPage(["Admin"]), getForm); //complete
router.post(
  "/add-user",
  registerValidation,
  validationMiddleware,
  userAuth,
  addUser
); //complete
router.get("/manage-users", userAuth, authPage(["Admin"]), getUsers); //complete
router.get(
  "/edit-user/:user_id",
  userAuth,
  authPage(["Admin"]),
  getForm,
  getUserByID
); //not use
router.put("/edit-user/:user_id", validationMiddleware, userAuth, updateUser); //complete
router.delete("/manage-users/:user_id", deleteUser); //complete

//========Operator routes=============
router.post("/warehouse/:wh_id/picking-list", userAuth, createOrder);
router.get("/order-list", getCurrentOrder);
router.get("/history-order", getCompletedOrder);
router.delete("/order/:order_id", userAuth, deleteOrder);
router.get("/order/:order_id", getOrderDetail);
router.get("/stock", userAuth, authPage(["Admin"]), getStock);

//========Forklift routes=============
router.get(
  "/picking/:order_id",
  userAuth,
  authPage(["Forklift"]),
  startOrder
);
router.post(
  "/picking/:order_id",
  userAuth,
  validateItem,
  updateItem
);

router.post(
  "/put-away/:wh_id", 
  userAuth,
  authPage(["Forklift"]), 
  findPosition
);

router.put(
  "/update-item",
  userAuth,
  updateUsedItem
);

router.put("/put-away-finish", userAuth,finishPutAway);

//========= NO UI (just test)================
router.post(
  "/add-item",
  userAuth,
  addItem
);

module.exports = router;
