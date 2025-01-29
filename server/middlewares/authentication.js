const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

async function authentication(req, res, next) {
  try {
    let bearerToken = req.headers.authorization
    if (!bearerToken) {
      throw { name: "Unauthorized", message: "Invalid token" }
    }

    let [, token] = bearerToken.split(' ')
    if (!token) {
      throw { name: "Unauthorized", message: "Invalid token" }
    }

    let data = verifyToken(token)
    let user = await User.findByPk(data.id)
    if (!user) {
      throw { name: "Unauthorized", message: "Invalid token" }
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication