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

   static async removeListByListId(listId, {user}) {
      const result = await db.query(
          `
              DELETE FROM lists WHERE id = $1
          `, [listId]
      )
      
      const results = await this.getUserLists({user});
      
      return results;
   }

   static async removeListByListId(listId, {user}) {
      const result = await db.query(
          `
              DELETE FROM lists WHERE id = $1
          `, [listId]
      )
      
      const results = await this.getUserLists({user});
      
      return results;
   }

   static async editList({ listUpdate, listId }) {    
      const resultInfo = await db.query(
         `SELECT name, emoji_unicode FROM lists WHERE id = $1 `, [listId]
      )
      const name = resultInfo.rows[0].name
      const emoji_unicode = resultInfo.rows[0].emoji_unicode
      const result = await db.query(
         `
         UPDATE lists
         SET name = $1, emoji_unicode = $2       
         WHERE id = $3
         RETURNING id, 
                  name,
                  emoji_unicode
      `,
         [
            listUpdate.name || name,
            listUpdate.emoji_unicode || emoji_unicode,
            listId
         ]
      )

      return result.rows[0]
   }
}

module.exports = List;