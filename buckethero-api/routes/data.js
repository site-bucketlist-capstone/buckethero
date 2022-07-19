const express = require("express")
const List = require("../models/list")
const Items = require("../models/items")
const security = require("../middleware/security")
const router = express.Router()

router.get("/lists", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
     const { user } = res.locals;
     const list = await List.getUserLists({user});
     return res.status(200).json({ list });
  } catch(error) {
     next(error);
  }
});

router.post("/lists/new", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
     const  { user } = res.locals;
     const list = await List.createNewList({ list: req.body, user});
     res.status(201).json({ list });
  } catch(error) {
     next(error);
  }
});

router.post("/lists/:id/newItem", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals 
    const { listId } = req.params
    const item = await createNewListItem({ item: req.body }, { user }, listId)
    return res.status(201).json({ item })
  } catch(err) {
    next(err)
  }
})

router.get("/items/:filterOption", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //3 filter options (listID, completed, due_date)
    const { filterOption } = req.params 
    if ( Number.isInteger(filterOption) ) {
      const result = await Items.fetchItemsByListId(filterOption) 
    } else if ( filterOption == "completed" ) {
      const result = await Items.fetchItemsByCompletion()
    } 
    // else if ( filterOption == "due_date") {
    //   const result = await Items.fetchItemsByDueDate() 
    // } 
  } catch (err) {
    next(err)
  }
})

// router.get("/items/:itemId", security.requireAuthenticatedUser, async (req, res, next) => {
//   try {
//     const { itemId } = req.params
//     const item = await Items.fetchItemById(itemId)
//     return res.status(200).json({ item })
//   } catch(err) {
//     next(err)
//   }
// })

module.exports = router