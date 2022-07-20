const db = require("../db");
const { BadRequestError, NotFoundError} = require("../utils/errors");

class List {
   static async getUserLists({user}) {
      const results = await db.query (
         `
         SELECT n.id,
                n.name,
                n.emoji_unicode
         FROM lists AS n
         WHERE n.user_id = (SELECT users.id from users WHERE email = $1)
         ORDER BY n.created_at DESC
         `, [user.email] 
      )  
      return results.rows;
   }

   // static async fetchListById(userId, listId) {
   //    const results = await db.query (
   //       `
   //       SELECT n.id,
   //              n.category,          
   //       FROM lists AS n
   //          JOIN users AS u ON u.id = n.user_id
   //       WHERE n.id = $1 AND n.user_id = $2
   //       `, [listId, userId] 
   //    )
   //    const list = results.rows[0];
   //    if (!list) {
   //       throw new NotFoundError("Doesn't exist.");
   //    }   
   //    return list;
   // }


   static async createNewList({ list, user }) {
      console.log(list.name);
      if (!list.name) {
         throw new BadRequestError("Missing name of list in request.");
      }

      const result = await db.query(`
         INSERT INTO lists ( name, emoji_unicode, user_id ) VALUES ( 
            $1, $2,(SELECT id FROM users WHERE email=$3)
         ) 
         RETURNING id, name, emoji_unicode, created_at AS "createdAt";
      `, [ list.name, list.emoji_unicode, user.email]);

      return result.rows[0];
      //
   }
}

module.exports = List;