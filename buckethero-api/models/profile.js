const db = require("../db")
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

}

module.exports = Profile