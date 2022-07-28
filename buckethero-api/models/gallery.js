const db = require("../db")
const { NotFoundError } = require("../utils/errors")

class Gallery {
   static async getGallery() {
      const results = await db.query (
         `
         SELECT g.id,
                g.name,
                g.location,
                g.category
         FROM gallery_items AS g
         `
      )  
      return results.rows;
   }

   static async fetchItemsNotOwnedByUser({user}) {
      const results = await db.query(
          `
              SELECT  list_items.id,
                      list_items.name, 
                      list_items.category, 
                      list_items.location, 
                      users.first_name,
                      users.last_name
              FROM list_items
              JOIN users ON users.id = list_items.user_id
              WHERE users.email != $1
          `, [user.email]
      )

      const items = results.rows;

      if (!items) {
          throw new NotFoundError()
      }

      return items;
  }
}

module.exports = Gallery;