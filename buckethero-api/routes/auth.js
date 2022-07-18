const express = require("express");
const router = express.Router();
const User  = require("../models/user");
const security = require("../middleware/security");
const { createUserToken } = require("../utils/tokens");

router.post("/login", async (req, res, next) => {
   try {
      const user = await User.login(req.body);
      const token = createUserToken(user);
      res.status(200).json({user,token});
   } catch(error) {
      next(error);
   }
});

router.post("/register", async (req, res, next) => {
   try {
      const user = await User.register(req.body);
      const token = createUserToken(user);
      res.status(201).json({user,token});
   } catch(error) {
      next(error);
   }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
   try {
      const { email } = res.locals.user;
      const user = await User.fetchUserByEmail(email);
      const publicUser = await User.makePublicUser(user);
      return res.status(200).json({ user: publicUser });
   } catch (error) {
      next(error);
   }
})

module.exports = router;
