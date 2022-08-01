const db = require("../db")
const { NotFoundError } = require("../utils/errors")

class Gallery {
   static async getGallery({user}) {
      const results = await db.query (
         `
         SELECT g.id,
                g.name,
                g.location,
                g.category,
                g.first_name,
                g.last_name
         FROM gallery_items AS g
         `
      )  
      return results.rows;
   }

//    static async fetchItemsNotOwnedByUser(user) {
//       const results = await db.query(
//           `
//               SELECT  list_items.id,
//                       list_items.name, 
//                       list_items.category, 
//                       list_items.location, 
//                       users.first_name,
//                       users.last_name
//               FROM list_items 
//                JOIN users 
//               WHERE users.email != $1
//           `, [user.email]
//       )
//       const items = results.rows;
//       if (!items) {
//           throw new NotFoundError()
//       }
//       return items;
//   }

//    static async createNewGallery({user}) {
//       const items = await this.fetchItemsNotOwnedByUser({user});
//       console.log(items);
//       items.map(async (item) => {
//          let result = await db.query(
//             `
//                IF NOT EXISTS (SELECT name FROM gallery_items WHERE name = $1)
//                 INSERT INTO gallery_items (name, location, category)
//                 VALUES($1, $2, $3)
//                 RETURNING id,
//                             name, location, category
//             `, [item.name, item.location, item.category]
//          )
         
//       })
      
//    }
}

module.exports = Gallery;