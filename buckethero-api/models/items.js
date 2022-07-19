const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

//!!!!remove any id from list_items!!!!!
class Items {

    static async createNewListItem({item, user, listId}) {
        //checks to make sure item at least has "name"
        if (!item.hasOwnProperty("name")) {
            throw new BadRequestError(`Require field - ${field} - missing from request body`)
        }  


        const results = await db.query(
            `
                INSERT INTO list_items (name, location, category, price_point, due_date, user_id, list_id)
                VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6), (SELECT id FROM lists WHERE id = $7))
                RETURNING id, 
                          name,
                          location, 
                          category, 
                          price_point, 
                          user_id, 
                          list_id, 
                          is_completed, 
                          created_at
            `, [item.name, item.location, item.category, item.price_point, item.due_date, user.email, listId]
        )

        return results.rows[0]
    } 

    static async fetchItemsByListId(listId, {user}) {
        const results = await db.query(
            `
                SELECT * FROM list_items 
                JOIN users ON users.id = list_items.user_id
                WHERE list_items.list_id = $1
                AND users.email = $2
            `, [listId , user.email]
        )
        const items = results.rows

        if (!items) {
            throw new NotFoundError() 
        }

        return items
    }

    static async fetchItemsByCompletion({user}) {
        const results = await db.query(
            `
                SELECT * FROM list_items 
                JOIN users ON users.id = list_items.user_id
                WHERE is_completed = true 
                AND users.email = $1
            `, [user.email]
        )

        const items = results.rows 

        if (!items) {
            throw new NotFoundError()
        }

        return items 
    }

    static async fetchItemsByDueDate({user}) {
        const results = await db.query(
            `
                SELECT * FROM list_items 
                JOIN users ON users.id = list_items.user_id
                WHERE users.email = $1 
                ORDER BY due_date ASC
                LIMIT 4
            `, [user.email]
        )

        const items = results.rows 

        if (!items) {
            throw new NotFoundError()
        }

        return items 
    }



    // static async fetchItemById(itemId) {
    //     const results = await db.query(
    //     `
    //         SELECT list_items.id,
    //                list_items.name, 
    //                list_items.due_date, 
    //                list_items.category, 
    //                list_items.location, 
    //                list_items.price_point, 
    //                list_items.is_completed, 
    //                list_items.rating
    //         FROM list_items 
    //         WHERE list_items.
    //     `, [itemId]
    //     )

    //     const item = results.rows[0]

    //     if (!item) {
    //         throw new NotFoundError() 
    //     }

    //     return item 
    // }

}

module.exports = Items;