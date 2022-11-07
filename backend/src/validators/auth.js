const { check, body } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//* Add user validation
//username
const user_id = check('user_id')
    .isLength({ min: 5 , max: 20 })
    .withMessage("User's ID has to be between 5-20 characters.")

//password
const password = check('password')
    .isLength({ min: 4})
    .withMessage('Password has to more than 4 characters.')

//role
const role = check('role')
    .isLength({ min: 3 })
    .withMessage('Please enter a role.')

//check if username exists
const user_idExist = check('user_id').custom(async (value) => {
    const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1`, [value])

    if (rows.length) {
        throw new Error('This user_id already exists.')
    }
})


//check if first_name AND last_name are exists

//check if password confirmation matches password 


//*login validation

const loginFieldCheck = check('user_id').custom(async (value, { req }) => {
    const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [value])

    if (!user.rows.length) { //if cannot find username in database
        throw new Error('This id does not exists.')
    }


    //compare input password with hash password in database
    const validPasswordHashed = await compare(req.body.password, user.rows[0].password_hash)

    // console.log(req.body.password) //input field password
    // console.log(user.rows[0].password_hash) //password in database

    if (!validPasswordHashed) {
        //compare input password with normal password in database (delete later)
        if (req.body.password !== user.rows[0].password_hash) {
            throw new Error('Wrong password')
        }
    }

    req.user = user.rows[0] //get user login

})


module.exports = {
    registerValidation: [user_id, password, role, user_idExist],
    loginValidation: [loginFieldCheck]
}