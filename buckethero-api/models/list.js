const db = require("../db");
const { BadRequestError, NotFoundError} = require("../utils/errors");

class List {
   static async getUserLists({user}) {
      const results = await db.query (
         `
         SELECT n.id,
                n.name
         FROM lists AS n
         WHERE n.user_id = (SELECT users.id from users WHERE email = $1)
         ORDER BY n.created_at DESC
         `, [user.email] 
      )  
      return results.rows;
   }

   static async fetchListById(userId, listId) {
      const results = await db.query (
         `
         SELECT n.id,
                n.category,
                n.calories,
                n.image_url,
                n.user_id,
                u.email,
                n.created_at
         FROM lists AS n
            JOIN users AS u ON u.id = n.user_id
         WHERE n.id = $1 AND n.user_id = $2
         `, [listId, userId] 
      )
      const list = results.rows[0];
      if (!list) {
         throw new NotFoundError("Doesn't exist.");
      }   
      return list;
   }


   static async createNewList({ list, user }) {
      const required = ["name"];
      required.forEach(field => {
         if (!nutrition.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request.`);
         }
      });

      const result = await db.query(`
         INSERT INTO lists ( name ) VALUES ( $1 ) 
         RETURNING id, name, created_at AS createdAt;
      `, [ list.name]);

      return result.rows[0];
   }
}

module.exports = List;