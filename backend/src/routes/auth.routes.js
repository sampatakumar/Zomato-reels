const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')


// user auth routes
router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)
router.get("/user/logout", authController.logoutUser)

//foodpartener auth routes
router.post("/partner/register", authController.registerFoodPartner)
router.post("/partner/login", authController.loginFoodPartner)
router.get("/partner/logout", authController.partnerLogout)



module.exports = router;