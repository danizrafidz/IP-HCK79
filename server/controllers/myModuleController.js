const { User, Module, MyModule, Team } = require('../models')

// "//" = NOT YET
// "//*" = DONE
class ModuleController {
  static async getMyModules(req, res, next) { //* 7. GET /mymodules
    try {
      // Fetch all modules in logged-in user's module list.
      // ! Request (headers) - handled in authentication
      const userId = +req.user.id

      let myModules = await MyModule.findAll({
        include: {
          model: Module,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: Team,
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
        },
        where: { UserId: userId }
      })

      // Response (200 - OK)
      res.status(200).json(myModules)
    } catch (err) {
      next(err)
    }
  }

  static async createMyModule(req, res, next) { //* 8. POST /mymodules/:moduleId
    try {
      // Add module to the logged-in user's module list.
      // ! Request (headers) - handled in authentication
      const userId = +req.user.id
      // Request (params)
      const moduleId = +req.params.moduleId

      // Response (404 - Not Found)
      let module = await Module.findByPk(moduleId)
      if (!module) {
        throw { name: "NotFound", message: "Module not found" }
      }

      // Response (400 - Bad Request)
      let myModule = await MyModule.findOne({
        where: { ModuleId: module.id }
      })
      if (myModule) {
        throw { name: "BadRequest", message: "You cannot add same module" }
      }

      myModule = await MyModule.create({ UserId: userId, ModuleId: moduleId })

      // Response (201 - Created)
      let { updatedAt, createdAt, ...myModuleExcludeDate } = myModule.toJSON()
      res.status(201).json(myModuleExcludeDate)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ModuleController