const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Items {

    static async fetchItemsByListId(listId) {
        const results = await db.query(
            `
                SELECT * from list_items 
                WHERE list_id = $ 1
            `, [listId]
        )

        const items = results.rows

        if (!items) {
            throw new NotFoundError() 
        }

        return items
    }

    static async fetchItemsByCompletion() {
        const results = await db.query(
            `
                SELECT * from list_items 
                WHERE is_completed = true 
            `
        )

        const items = results.rows 

        if (!items) {
            throw new NotFoundError()
        }

        return items 
    }


    static async fetchItemById(itemId) {
        const results = await db.query(
        `
            SELECT list_items.id,
                   list_items.name, 
                   list_items.due_date, 
                   list_items.category, 
                   list_items.location, 
                   list_items.price_point, 
                   list_items.is_completed, 
                   list_items.rating
            FROM list_items 
            WHERE list_items.
        `, [itemId]
        )

        const item = results.rows[0]

        if (!item) {
            throw new NotFoundError() 
        }

        return item 
    }

}