const express = require("express")
const Profile = require("../models/profile")
const security = require("../middleware/security")
const router = express.Router()

router.put("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals;
        // console.log("req.body: ", req.body)
        let imageString = req.body
        const resultString = await Profile.addProfileImage({imageString, user})
        return res.status(201).json(resultString);
    } catch(error) {
       next(error);
    }
});

router.put("/edit", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
      const { user } = res.locals;  
      const result = await Profile.updateProfile({ profileUpdate: req.body, user})  
      return res.status(201).json(result);
  } catch(error) {
     next(error);
  }
});

router.put("/edit/password", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals;  
        const result = await Profile.checkPassword({ profileUpdate: req.body, user})  
        return res.status(201).json(result);
    } catch(error) {
       next(error);
    }
  });

  

module.exports = router;
