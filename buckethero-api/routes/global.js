const express = require("express")
const Gallery = require("../models/gallery");
const User = require("../models/user");
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
   try {
      const { user } = res.locals;
      const list = await Gallery.getGallery({user});
      return res.status(200).json({ list });
   } catch(error) {
      next(error);
   }
});

router.get("/user/:userId", security.requireAuthenticatedUser, async (req, res, next) => {
   try {
       const id = req.params.userId;
       const user = await User.fetchUserById(id);
       const publicUser = await User.makePublicUser(user);
       return res.status(200).json({ user: publicUser });
    } catch (error) {
       next(error);
    }
});

module.exports = router;