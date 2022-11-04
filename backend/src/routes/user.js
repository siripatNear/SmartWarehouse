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
  createOrder,
  getCurrentOrder,
  getCompletedOrder,
  fetchFilterItems,
  deleteOrder,
  getOrderDetail,
} = require("../controllers/data");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");

router.get(
  "/warehouse/:wh_id",
  userAuth,
  authPage(["Admin", "Operator"]),
  fetchData,
  fetchFilterItems
);

//Admin routes
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

//operator routes
router.post("/warehouse/:wh_id/picking-list", userAuth, createOrder);
router.get(
  "/order-list",
  userAuth,
  authPage(["Admin", "Operator"]),
  getCurrentOrder
);
router.get("/history-order", getCompletedOrder);
router.delete("/order/:order_id", deleteOrder);
router.get(
  "/order/:order_id",
  userAuth,
  authPage(["Admin", "Operator"]),
  getOrderDetail
);

module.exports = router;
