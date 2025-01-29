const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

// "//" = NOT YET
// "//*" = DONE
class UserController {
  static async register(req, res, next) { //* 1. POST /register
    try {
      // Request (body)
      const { email, password } = req.body

      // Response (400 - Bad Request)
      let user = await User.create({ email, password })

      // Response (201 - Created)
      res.status(201).json({
        id: user.id,
        email: user.email
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
}

module.exports = UserController