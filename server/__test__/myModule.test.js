const { test, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Module, MyModule, Team, sequelize } = require('../models')
const app = require('../app')
const request = require('supertest')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken, verifyToken } = require('../helpers/jwt')

let access_token_admin;
let access_token_user;
let invalid_access_token;

beforeAll(async () => {
    let teams = require('../data/teams.json').map((team) => {
      delete team.id
      team.createdAt = new Date()
      team.updatedAt = new Date()
      return team
    })
    let users = require('../data/users.json').map((user) => {
      delete user.id
      user.createdAt = new Date()
      user.updatedAt = new Date()
      user.password = hashPassword(user.password)
      return user
    })
    let modules = require('../data/modules.json').map((module) => {
      delete module.id
      module.createdAt = new Date()
      module.updatedAt = new Date()
      return module
    })
    let myModules = [
      {
        id: 1,
        UserId: 1,
        ModuleId: 11,
      },
      {
        id: 2,
        UserId: 2,
        ModuleId: 22,
      }
    ]
    
    myModules = myModules.map((myModule) => {
      delete myModule.id
      myModule.createdAt = new Date()
      myModule.updatedAt = new Date()
      myModule.isCompleted = false
      return myModule
    })

    await sequelize.queryInterface.bulkInsert('Teams', teams)
    await sequelize.queryInterface.bulkInsert('Users', users)
    await sequelize.queryInterface.bulkInsert('Modules', modules)
    await sequelize.queryInterface.bulkInsert('MyModules', myModules)

    let admin = await User.findOne({ where: { email: 'admin.alpha@mail.com' } })
    access_token_admin = signToken({ id: admin.id })

    let user = await User.findOne({ where: { email: 'red.romeo@mail.com' } })
    access_token_user = signToken({ id: user.id })

    invalid_access_token = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
})

afterAll(async () => {
  await MyModule.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
  await Module.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
  await Team.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
})


describe("POST /mymodules/:moduleId", () => {
  test("201 - Successfull add module to the logged-in user's module list", async () => {
    const res = await request(app)
      .post('/mymodules/33')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ POST /mymodules/:moduleId ~ test1:", status, body, '<<< LOG')
    expect(status).toBe(201)
    expect(body).toHaveProperty("id", expect.any(Number))
    expect(body).toHaveProperty("UserId", verifyToken(access_token_user).id) // current user id is 2
    expect(body).toHaveProperty("ModuleId", 33)
    expect(body).toHaveProperty("isCompleted", false)
  })
  test("401 - Module not found", async () => {
    const res = await request(app)
      .post('/mymodules/999')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ POST /mymodules/:moduleId ~ test2:", status, body, '<<< LOG')
    expect(status).toBe(404)
    expect(body).toHaveProperty("message", 'Module not found')
  })
  test("400 - Duplicate module", async () => {
    const res = await request(app)
      .post('/mymodules/33')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ POST /mymodules/:moduleId ~ test3:", status, body, '<<< LOG')
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'You cannot add same module')
  })
})

describe("GET /mymodules", () => {
  test("200 - Successfull fetch all modules in logged-in user's module list.", async () => {
    const res = await request(app)
      .get('/mymodules')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ GET /mymodules ~ test1:", status, body, '<<< LOG')
    expect(status).toBe(200)
    expect(Array.isArray(body)).toBeTruthy()
    expect(body[0]).toHaveProperty("createdAt", expect.any(String))
  })
})

describe("DELETE /mymodules/:id", () => {
  test("200 - Successful delete user module", async () => {
    const res = await request(app)
      .delete('/mymodules/3')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ DELETE /mymodules/:id ~ test1:", status, body, '<<< LOG')
    expect(status).toBe(200)
    expect(body).toHaveProperty("message", 'User module successfully deleted')
  })
  test("401 - Failed to delete as user haven't log in yet", async () => {
    const res = await request(app)
      .delete('/mymodules/3')
    const { status, body } = res

    console.log("🚀 ~ DELETE /mymodules/:id ~ test2:", status, body, '<<< LOG')
    expect(status).toBe(401)
    expect(body).toHaveProperty("message", 'Invalid token')
  })
  test("404 - Failed to delete as user module not found", async () => {
    const res = await request(app)
      .delete('/mymodules/6')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ DELETE /mymodules/:id ~ test3:", status, body, '<<< LOG')
    expect(status).toBe(404)
    expect(body).toHaveProperty("message", 'User module not found')
  })
  test("403 - Failed to delete as it's not user's ownership", async () => {
    const res = await request(app)
      .delete('/mymodules/1')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ DELETE /mymodules/:id ~ test4:", status, body, '<<< LOG')
    expect(status).toBe(403)
    expect(body).toHaveProperty("message", 'You are not authorized')
  })
})

describe("PATCH /mymodules/:id/complete", () => {
  test("200 - Successful update mymodule completion by id", async () => {
    const res = await request(app)
      .patch('/mymodules/2/complete')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ PATCH /mymodules/:id/complete ~ test1:", status, body, '<<< LOG')
    expect(status).toBe(200)
    expect(body).toHaveProperty("message", "User module completion successfully updated")
  })
  test("400 - Failed to update as user module has been completed", async () => {
    const res = await request(app)
      .patch('/mymodules/2/complete')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ PATCH /mymodules/:id/complete ~ test2:", status, body, '<<< LOG')
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", 'You cannot update completed module')
  })
  test("404 - Failed to delete as user module not found", async () => {
    const res = await request(app)
      .patch('/mymodules/6/complete')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ PATCH /mymodules/:id/complete ~ test3:", status, body, '<<< LOG')
    expect(status).toBe(404)
    expect(body).toHaveProperty("message", 'User module not found')
  })
  test("403 - Failed to update as it's not user's ownership", async () => {
    const res = await request(app)
      .patch('/mymodules/1/complete')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ PATCH /mymodules/:id/complete ~ test4:", status, body, '<<< LOG')
    expect(status).toBe(403)
    expect(body).toHaveProperty("message", 'You are not authorized')
  })
})