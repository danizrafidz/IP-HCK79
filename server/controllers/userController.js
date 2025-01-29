const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User, Team } = require('../models')

// "//" = NOT YET
// "//*" = DONE
class UserController {
  static async register(req, res, next) { //* 1. POST /register
    try {
      // Request (body)
      const { fullName, email, password, avatarUrl, TeamId } = req.body

      // Response (400 - Bad Request)
      let user = await User.create({ fullName, email, password, avatarUrl, TeamId })

      // Response (201 - Created)
      res.status(201).json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        TeamId: user.TeamId,
      })
    } catch (err) {
      next(err)
    }
  }
  static async login(req, res, next) { //* 2. POST /login
    try {
      // Request (body)
      const { email, password } = req.body

      // Response (400 - Bad Request)
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" }
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" }
      }

      // Response (401 - Unauthorized)
      let user = await User.findOne({ where: { email } })
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" }
      }
      let isValidatePassword = comparePassword(password, user.password)
      if (!isValidatePassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" }
      }

      let access_token = signToken({ id: user.id })

      // Response (200 - OK)
      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }

  static async getUser(req, res, next) { //* 3. GET /user
    try {
      const userId = +req.user.id

      // Response (400 - Bad Request)
      let user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        include: {
          model: Team,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
      })

      // Response (200 - OK)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController