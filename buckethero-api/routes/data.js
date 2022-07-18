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

router.get("/items/:filterOption", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user
    const user = await User.fetchUserByEmail(email)
    
    return res.status(200).json({ user: publicUser })
  } catch (err) {
    next(err)
  }
})

module.exports = router