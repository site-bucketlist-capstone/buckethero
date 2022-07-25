const express = require("express")
const Profile = require("../models/profile")
const security = require("../middleware/security")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals;
        const imageString = await Profile.addProfileImage({ imageString: req.body, user})
        res.status(201).json({ imageString });
    } catch(error) {
       next(error);
    }
  });

module.exports = router;
