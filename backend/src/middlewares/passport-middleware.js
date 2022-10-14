const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db');

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ user_id }, done)=>{
        try {
            const { rows } = await db.query(`
                SELECT user_id, first_name, last_name 
                FROM users WHERE user_id = $1`,
                [user_id]
            )

            if (!rows.length){
                throw new Error('401 not authorized')
            }

            let user = { user_id: rows[0].user_id, 
                        first_name: rows[0].first_name, 
                        last_name: rows[0].last_name }

            return await done(null, user)
        } catch (error){
            console.log(error.message)
            done(null, false)
        }
    })
)