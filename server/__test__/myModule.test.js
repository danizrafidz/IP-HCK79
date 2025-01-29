// const { test, expect, beforeAll, afterAll } = require('@jest/globals')
// const { User, Module, MyModule, Team, sequelize } = require('../models')
// const app = require('../app')
// const request = require('supertest')
// const { hashPassword } = require('../helpers/bcrypt')
// const { signToken, verifyToken } = require('../helpers/jwt')

// let access_token_admin;
// let access_token_user;
// let invalid_access_token;

// beforeAll(async () => {
//   let teams = require('../data/teams.json').map((team) => {
//     delete team.id
//     team.createdAt = new Date()
//     team.updatedAt = new Date()
//     return team
//   })
//   let users = require('../data/users.json').map((user) => {
//     delete user.id
//     user.createdAt = new Date()
//     user.updatedAt = new Date()
//     user.password = hashPassword(user.password)
//     return user
//   })
//   let modules = require('../data/modules.json').map((module) => {
//     delete module.id
//     module.createdAt = new Date()
//     module.updatedAt = new Date()
//     return module
//   })
//   let myModules = require('../data/modules.json').map((myModule) => {
//     delete myModule.id
//     myModule.createdAt = new Date()
//     myModule.updatedAt = new Date()
//     return myModule
//   })

//   await sequelize.queryInterface.bulkInsert('Teams', teams)
//   await sequelize.queryInterface.bulkInsert('Users', users)
//   await sequelize.queryInterface.bulkInsert('Modules', modules)
//   await sequelize.queryInterface.bulkInsert('Modules', myModules)

//   let admin = await User.findOne({ where: { email: 'admin.alpha@mail.com' } })
//   access_token_admin = signToken({ id: admin.id })

//   let user = await User.findOne({ where: { email: 'red.romeo@mail.com' } })
//   access_token_user = signToken({ id: user.id })

//   invalid_access_token = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
// })

// afterAll(async () => {
//   await MyModule.destroy({
//     truncate: true,
//     cascade: true,
//     restartIdentity: true
//   })
//   await Module.destroy({
//     truncate: true,
//     cascade: true,
//     restartIdentity: true
//   })
//   await User.destroy({
//     truncate: true,
//     cascade: true,
//     restartIdentity: true
//   })
//   await Team.destroy({
//     truncate: true,
//     cascade: true,
//     restartIdentity: true
//   })
// })


// describe("POST /mymodules/:moduleId", () => {
//   test("201 - Successfull add module to the logged-in user's module list", async () => {
//     const res = await request(app)
//       .post('/mymodules/9')
//       .set('Authorization', 'Bearer ' + access_token_user)
//     const { status, body } = res

//     console.log("🚀 ~ POST /mymodules/:moduleId ~ test1:", status, body, '<<< LOG')
//     expect(status).toBe(201)
//     expect(body).toHaveProperty("id", expect.any(Number))
//     expect(body).toHaveProperty("UserId", verifyToken(access_token_user).id) // current user id is 2
//     expect(body).toHaveProperty("ModuleId", 9)
//     expect(body).toHaveProperty("isCompleted", false)
//   })
//   test("401 - Module not found", async () => {
//     const res = await request(app)
//       .post('/mymodules/999')
//       .set('Authorization', 'Bearer ' + access_token_user)
//     const { status, body } = res

//     console.log("🚀 ~ POST /mymodules/:moduleId ~ test2:", status, body, '<<< LOG')
//     expect(status).toBe(404)
//     expect(body).toHaveProperty("message", 'Module not found')
//   })
//   test("400 - Duplicate module", async () => {
//     const res = await request(app)
//       .post('/mymodules/9')
//       .set('Authorization', 'Bearer ' + access_token_user)
//     const { status, body } = res

//     console.log("🚀 ~ POST /mymodules/:moduleId ~ test3:", status, body, '<<< LOG')
//     expect(status).toBe(400)
//     expect(body).toHaveProperty("message", 'You cannot add same module')
//   })
// })

// describe("GET /mymodules", () => {
//   test("200 - Successfull fetch all modules in logged-in user's module list.", async () => {
//     const res = await request(app)
//       .get('/mymodules')
//       .set('Authorization', 'Bearer ' + access_token_user)
//     const { status, body } = res

//     console.log("🚀 ~ GET /mymodules ~ test1:", status, body, '<<< LOG')
//     expect(status).toBe(200)
//     expect(Array.isArray(body)).toBeTruthy()
//     expect(body[0]).toHaveProperty("createdAt", expect.any(String))
//   })
// })


