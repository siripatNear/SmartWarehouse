const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");
const models = require("../../database/models");

//* Get users
// Using sequelize
exports.getUsers = async (req, res) => {
  try {
    const users = await models.Users.findAll({
      attributes: ["user_id", "first_name", "last_name", "role"],
    });
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// *Add new user to database
// Using sequelize
exports.addUser = async (req, res) => {
  try {
    const { user_id, first_name, last_name, password, role } = req.body;
    const hashedPassword = await hash(password, 10);
    const data = {
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      password_hash: hashedPassword,
      role: role,
      create_by: req.user.user_id,
    };
    const user = await models.Users.create(data);

    return res.status(201).json({
      success: true,
      message: "Adding user was successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//* GET /edit-user Form by user_id
// Using sequelize
exports.getUserByID = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await models.Users.findOne({
      attributes: ["user_id", "first_name", "last_name", "role"],
      where: { user_id: user_id },
    });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "you have permission to access",
        user: user,
      });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//* PUT (update) user
// Using sequelize
exports.updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { first_name, last_name, password, role } = req.body;
    const hashedPassword = await hash(password, 10);
    const modify_dt = new Date();
    const data = {
      first_name: first_name,
      last_name: last_name,
      password_hash: hashedPassword,
      role: role,
      modify_by: req.user.user_id,
      modify_dt: modify_dt,
    };
    const [updated] = await models.Users.update(data, {
      where: { user_id: user_id },
    });
    if (updated) {
      const updatedUser = await models.Users.findOne({
        where: { user_id: user_id },
        attributes: ["user_id", "first_name", "last_name", "role"],
      });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//* DELETE user by user_id
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deleted = await models.Users.destroy({
      where: { user_id: user_id },
    });
    if (deleted) {
      return res.status(201).json({
        success: true,
        message: "Delete user was successful",
        user_id: user_id,
      });
    }
    throw new Error("User_id was not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//* Login path after enter correct user_id and password
exports.login = async (req, res) => {
  let user = req.user;
  let payload = {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
  };
  try {
    const token = await sign(payload, SECRET);
    await models.Users.update(
      {
        last_login: new Date(),
        user_status: "Online",
      },
      {
        where: { user_id: req.user.user_id },
      }
    );
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
      user: payload,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

//* Authentication
exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

//* Logout
exports.logout = async (req, res) => {
  try {
    console.log("user:" + req.user.user_id + " is logged out");
    await models.Users.update(
      {
        user_status: "Offline",
      },
      {
        where: { user_id: req.user.user_id },
      }
    );
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
