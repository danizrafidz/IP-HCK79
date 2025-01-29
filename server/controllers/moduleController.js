const { User, Module } = require('../models')

// "//" = NOT YET
// "//*" = DONE
class ModuleController {
  static async getModules(req, res, next) { //* 5. GET /modules
    try {
      // Get all modules include team from database
      // ! Request (headers) - handled in authentication

      let modules = await Module.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      })
      // Response (200 - OK)
      res.status(200).json(modules)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ModuleController