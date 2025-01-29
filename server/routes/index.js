const router = require("express").Router()

// const ModuleController = require('./controllers/moduleController')
const UserController = require('../controllers/userController')

// const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

//! List of available endpoints:
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// router.use(authentication)

//! Routes below need authentication:
// router.get('/vouchers', ModuleController.getVouchers)
// router.post('/gifts/:voucherId', ModuleController.createGift)
// router.get('/gifts', ModuleController.getGifts)

//! Routes below need authentication & authorization:
// router.patch('/gifts/:id/claim', authorization, ModuleController.claimGift)
// router.delete('/gifts/:id', authorization, ModuleController.deleteGift)

module.exports = router