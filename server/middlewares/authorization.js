const { MyModule } = require('../models')

async function authorization(req, res, next) {
  try {
    const id = +req.params.id
    const userId = +req.user.id
    const userRole = +req.user.role

    // ! Response (404 - Not Found)
    let myModule = await MyModule.findByPk(id)
    if (!myModule) {
      throw { name: "NotFound", message: "User module not found" }
    }

    // ! Response (403 - Forbidden)
    if (userId !== myModule.UserId && userRole !== "admin") {
      throw { name: "Forbidden", message: "You are not authorized" }
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization