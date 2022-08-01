const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

//!!!!remove any id from list_items!!!!!
class Items {

    static async createNewListItem({item, user, listId}) {
        if (!item.hasOwnProperty("name")) {
            throw new BadRequestError(`Require field - ${field} - missing from request body`)
        }   
        // const galleryItem = await db.query(
        //     `
        //     IF NOT EXISTS (SELECT name FROM gallery_items WHERE name = $1)
        //     INSERT INTO gallery_items (name, location, category)
        //     VALUES($1, $2, $3)
        //     RETURNING id,
        //                 name, location, category
        // `, [item.name, item.location, item.category]
            
        // )
        // console.log(galleryItem.rows);

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

        const galleryItem = await db.query(
                `
                    INSERT INTO gallery_items (name, location, category, first_name, last_name)
                    SELECT list_items.name, list_items.location, list_items.category, users.first_name, users.last_name FROM list_items 
                    JOIN users ON users.id = list_items.user_id
                    WHERE list_items.name NOT IN (SELECT name FROM gallery_items)
                    ORDER BY list_items.created_at DESC 
                    LIMIT 1 
                `, 
            
        )

        return results.rows[0]
    } 

    static async fetchItemsByListId(listId, {user}) {
        const results = await db.query(
            `
                SELECT list_items.id,
                       list_items.list_id,
                       list_items.user_id, 
                       list_items.name, 
                       list_items.due_date, 
                       list_items.category, 
                       list_items.location, 
                       list_items.price_point, 
                       list_items.is_completed, 
                       list_items.created_At,
                       users.first_name,
                       users.last_name,
                       users.email
                FROM list_items
                JOIN users ON users.id = list_items.user_id
                WHERE list_items.list_id = $1
                AND users.email = $2
                ORDER BY id DESC
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
                SELECT  list_items.id,
                        list_items.list_id,
                        list_items.user_id, 
                        list_items.name, 
                        list_items.due_date, 
                        list_items.category, 
                        list_items.location, 
                        list_items.price_point, 
                        list_items.is_completed, 
                        list_items.created_At,
                        users.first_name,
                        users.last_name,
                        users.email
                FROM list_items
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
                SELECT  list_items.id,
                        list_items.list_id,
                        list_items.user_id, 
                        list_items.name, 
                        list_items.due_date, 
                        list_items.category, 
                        list_items.location, 
                        list_items.price_point, 
                        list_items.is_completed, 
                        list_items.created_At,
                        users.first_name,
                        users.last_name,
                        users.email
                FROM list_items
                JOIN users ON users.id = list_items.user_id
                WHERE users.email = $1 AND list_items.is_completed = false
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

    static async removeItemsByListId(listId, itemId, {user}) {
        const results = await db.query(
            `
                DELETE FROM list_items WHERE list_id = $1 AND id = $2 
            `, [listId, itemId]
        )
        const items = await this.fetchItemsByListId(listId, {user})   
        return items 
    }

    static async editItem({ itemUpdate, listId, itemId }) {    
        const resultInfo = await db.query(
            `SELECT name, location, category, price_point, due_date, is_completed FROM list_items WHERE id = $1 `, [itemId]
        )
        const name = resultInfo.rows[0].name
        const location = resultInfo.rows[0].location
        const category = resultInfo.rows[0].category
        const price_point = resultInfo.rows[0].price_point
        const due_date  = resultInfo.rows[0].due_date
        const is_completed = resultInfo.rows[0].is_completed
        let isCompleted = false;
        if (itemUpdate.is_completed == null) {
            isCompleted = is_completed;
        } else {
            isCompleted = itemUpdate.is_completed;
        }
        console.log(isCompleted);
        const result = await db.query(
            `
            UPDATE list_items
            SET name = $1, location = $2, category = $3, price_point = $4, due_date = $5, is_completed = $6       
            WHERE id = $7
            RETURNING id, 
                    name,
                    category,
                    location,
                    price_point,
                    due_date::timestamp::DATE,
                    is_completed
        `,
            [
                itemUpdate.name || name,
                itemUpdate.location || location,
                itemUpdate.category || category,
                itemUpdate.price_point || price_point,
                itemUpdate.due_date || due_date,
                isCompleted,
                itemId
            ]
        )

        return result.rows[0]
    }

}

module.exports = Items;
