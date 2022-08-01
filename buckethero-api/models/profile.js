const db = require("../db")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { BadRequestError, NotFoundError} = require("../utils/errors")

class Profile {
    static async addProfileImage({imageString, user }) {
        const results = await db.query(
            `
            UPDATE users
            SET profile_image = $1     
            WHERE email = $2
            RETURNING email, 
                     profile_image
         `, [imageString.imageString, user.email]
        )

        return results.rows[0]
    }

    static async updateProfile({ profileUpdate, user }) {
        const resultInfo = await db.query(
            `SELECT first_name, last_name, email, password FROM users WHERE email = $1 `, [user.email]
        )    
        const first_name = resultInfo.rows[0].first_name;
        const last_name = resultInfo.rows[0].last_name;
        const email = resultInfo.rows[0].email;
        const password = resultInfo.rows[0].password;

        // check to see if current password is same 
        if (profileUpdate.password) {
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (isValid) {
                throw new BadRequestError("Current password must be same as old password");
            }
        }
        const hashedPassword = await bcrypt.hash(profileUpdate.password, BCRYPT_WORK_FACTOR)

        const results = await db.query(
            `
            UPDATE users
            SET first_name = $2, last_name = $3, email = $4, password = $5    
            WHERE email = $1
            RETURNING first_name,
                      last_name,
                      email,
                      password
         `, [
            user.email,
            profileUpdate.first_name || first_name ,
            profileUpdate.last_name || last_name,
            profileUpdate.email || email,
            hashedPassword || password
            ]
        )

        return results.rows[0]
    }

    static async checkPassword({ profileUpdate, password, user }) {
        const resultInfo = await db.query(
            `SELECT password FROM users WHERE email = $1 `, [user.email]
        )    
        const password = resultInfo.rows[0].password;

        // check to see if current password is same 
        if (profileUpdate.password) {
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (isValid) {
                throw new BadRequestError("Current password must be same as old password");
            }
        }
        const hashedPassword = await bcrypt.hash(profileUpdate.password, BCRYPT_WORK_FACTOR)

        const results = await db.query(
            `
            UPDATE users
            SET password = $2    
            WHERE email = $1
            RETURNING first_name,
                      last_name,
                      email,
                      password
         `, [
            user.email,
            hashedPassword || password
            ]
        )

        return results.rows[0]
    }

}

module.exports = Profile