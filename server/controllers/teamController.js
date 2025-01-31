const { User, Module, Team } = require('../models')

// "//" = NOT YET
// "//*" = DONE
class TeamController {
  static async getTeams(req, res, next) { //* 9. GET /teams
    try {
      // Get all teams from database
      // ! Request (headers) - handled in authentication
      let teams = await Team.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      // Response (200 - OK)
      res.status(200).json(teams)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TeamController