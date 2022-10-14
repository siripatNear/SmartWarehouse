const db = require('../db');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants')

//* get users
exports.getUsers = async (req,res) => {
    try {
        const { rows } = await db.query("SELECT first_name, last_name FROM users");
        
        return res.status(200).json({
            success: true,
            users: rows
        }) 

    }catch(error) {
        console.log(error.message);
    }
}

// *Add new user to database
exports.addUser = async (req,res) => {
    const { user_id, first_name, last_name, password, role } = req.body;
    try {
        const hashedPassword = await hash(password, 10);

        await db.query(`
            INSERT INTO users(user_id, first_name, last_name, password_hash, role)
            VALUES ($1,$2,$3,$4,$5)`,[user_id, first_name, last_name, hashedPassword, role ])

        return res.status(201).json({
            success: true,
            message: 'Adding user was successfull'
        })


    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }
}

//* Login path after enter correct user_id and password
exports.login = async (req,res)=>{
    let user = req.user
    let payload = {
        user_id : user.user_id,
        first_name : user.first_name,
        last_name : user.last_name
    }
    try{
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token',token,{httpOnly:true}).json({
            success: true,
            message: 'Logged in successfully'
        })

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }

}

//* Authentication
exports.protected = async (req,res) => {
    try {
        return res.status(200).json({
            info: 'protected info',
        }) 
    }catch(error) {
        console.log(error.message);
    }
}

//* Logout
exports.logout = async (req,res) => {
    console.log('logout');
    try {
        console.log('logout');
        return res
                .status(200)
                .clearCookie('token',{ httpOnly: true })
                .json({
            success: true,
            message: 'Logged out successfully'
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }
}
