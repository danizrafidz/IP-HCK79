const { User, Module, Team } = require('../models')

// "//" = NOT YET
// "//*" = DONE
class ModuleController {
  static async getModules(req, res, next) { //* 5. GET /modules
    try {
      // Get all modules include team from database
      // ! Request (headers) - handled in authentication

      let modules = await Module.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Team,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      })
      // Response (200 - OK)
      res.status(200).json(modules)
    } catch (err) {
      next(err)
    }
  }

  static async getModuleById(req, res, next) { //* 6. GET /modules/:id
    try {
      // Get one module by Id from database
      // ! Request (headers) - handled in authentication
      // Request (params)
      const moduleId = +req.params.id

      let module = await Module.findByPk(moduleId, {
        include: {
          model: Team,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      })
      if (!module) {
        throw { name: 'NotFound', message: 'Module not found' }
      }
      // Response (404 - Not Found)
      // Response (200 - OK)
      res.status(200).json(module)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ModuleController