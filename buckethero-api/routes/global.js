const express = require("express")
const Gallery = require("../models/gallery");
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
   try {
      const list = await Gallery.getGallery();
      return res.status(200).json({ list });
   } catch(error) {
      next(error);
   }
 });

module.exports = router;