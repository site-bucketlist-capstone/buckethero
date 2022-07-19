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
}

module.exports = Gallery;