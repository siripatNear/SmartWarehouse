const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");
const models = require("../../database/models");

//* get users
/*
exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT user_id, first_name, last_name, role FROM users"
    );

    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
*/
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
/*
exports.addUser = async (req, res) => {
  const { user_id, first_name, last_name, password, role } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      `
            INSERT INTO users(user_id, first_name, last_name, password_hash, role)
            VALUES ($1,$2,$3,$4,$5)`,[user_id, first_name, last_name, hashedPassword, role ])

        return res.status(201).json({
            success: true,
            message: 'Adding user was successful'
        })

    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }
}
*/
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


//     return res.status(201).json({
//       success: true,
//       message: "Adding user was successful",
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

//* GET /edit-user Form by user_id
/*
exports.getUserByID = async (req, res) => {
  let user_id = req.params.user_id;

  try {
    const data = await db.query(
      `
            SELECT first_name, last_name, user_id, role
            FROM users
            WHERE user_id = $1
        `,
      [user_id]
    );

    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}
*/
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
/*

exports.updateUser = async (req, res) => {
  const { first_name, last_name, role, password } = req.body;
  const user_id = String(req.params.user_id);
  try {

    const hashedPassword = await hash(password, 10);

    await db.query(`
            UPDATE users SET first_name = $1
            , last_name = $2, role = $3, password_hash = $4
            WHERE user_id = $5
            `, [first_name, last_name, role, hashedPassword, user_id])

    return res.status(201).json({
      success: true,
      message: 'Update user was successful',
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    })
  }
}
*/
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
/*
exports.deleteUser = async (req, res) => {
  const user_id = String(req.params.user_id);
  try {
    await db.query(
      `
            DELETE FROM users WHERE user_id = $1
            `,
      [user_id]
    );

    return res.status(201).json({
      success: true,
      message: "Delete user was successful",
      user_id: user_id,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
*/
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
    throw new Error("Post not found");
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
