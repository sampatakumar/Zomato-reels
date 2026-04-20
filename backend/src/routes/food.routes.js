const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const foodController = require('../controllers/food.controller')
const multer = require('multer')
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

/* POST /api/food [Protected] */
router.post("/", authMiddleware.authfoodPartnerMiddleware, upload.single('video'), foodController.createFood) ;

/* GET /api/food [Protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

module.exports = router;