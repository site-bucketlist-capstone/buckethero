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

router.post("/new", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
     const  { user } = res.locals;
     const list = await List.createNewList({ list: req.body, user});
     res.status(201).json({ list });
  } catch(error) {
     next(error);
  }
});

router.post("/:id/newItem", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals 
    const item = await Items.createNewListItem({ item: req.body, user, listId : req.params.id})
    return res.status(201).json({ item })
  } catch(err) {
    next(err)
  }
})

router.get("/items/:filterOption", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //3 filter options (listID, completed, due_date)
    const { user } = res.locals
    const filterOption = req.params.filterOption
    //checks if filterOption is a number 
    if ( filterOption[0] >= '0' && filterOption[0] <= '9' ) {
      const result = await Items.fetchItemsByListId(filterOption, {user}) 
      return res.status(200).json({result})
    } else if ( filterOption == "completed" ) {
      const result = await Items.fetchItemsByCompletion({user})
      return res.status(200).json({result})
    } 
    else if ( filterOption == "due_date") {
      const result = await Items.fetchItemsByDueDate({user}) 
      return res.status(200).json({result})
    } 
  } catch (err) {
    next(err)
  }
})

module.exports = router