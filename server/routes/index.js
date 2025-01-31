const router = require("express").Router()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const ModuleController = require('../controllers/moduleController')
const MyModuleController = require('../controllers/myModuleController')
const TeamController = require('../controllers/teamController')
const UserController = require('../controllers/userController')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

//! List of available endpoints:
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/google', UserController.loginGoogle);

router.use(authentication)

//! Routes below need authentication:
router.get('/user', UserController.getUser)
router.patch('/user/cover-avatar', upload.single('avatarUrl'), UserController.updateUserAvatar)
router.patch('/user/cover-galleries', upload.array('galleries', 3), UserController.updateUserGalleries)

router.get('/modules', ModuleController.getModules)
router.get('/modules/recommended', ModuleController.getRecommendedModulesAi)
router.get('/modules/:id', ModuleController.getModuleById)
router.get('/mymodules', MyModuleController.getMyModules)
router.post('/mymodules/:moduleId', MyModuleController.createMyModule)
router.get('/teams', TeamController.getTeams)

//! Routes below need authentication & authorization:
router.delete('/mymodules/:id', authorization, MyModuleController.deleteMyModule)
router.patch('/mymodules/:id/complete', authorization, MyModuleController.completeModule)

module.exports = router