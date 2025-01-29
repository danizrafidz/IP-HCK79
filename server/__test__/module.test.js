const { test, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Module, Team, sequelize } = require('../models')
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

  await sequelize.queryInterface.bulkInsert('Teams', teams)
  await sequelize.queryInterface.bulkInsert('Users', users)
  await sequelize.queryInterface.bulkInsert('Modules', modules)

  let admin = await User.findOne({ where: { email: 'admin.alpha@mail.com' } })
  access_token_admin = signToken({ id: admin.id })

  let user = await User.findOne({ where: { email: 'red.romeo@mail.com' } })
  access_token_user = signToken({ id: user.id })

  invalid_access_token = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
})

afterAll(async () => {
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

describe("GET /modules", () => {
  test("200 - Successfull fetch all modules include team", async () => {
    const res = await request(app)
      .get('/modules')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ GET /modules ~ test1:", status, body.slice(0, 3), '<<< LOG')
    expect(status).toBe(200)
    expect(Array.isArray(body)).toBeTruthy()
    expect(typeof body[0].Team).toBe("object")
  })
})

describe("GET /modules/:id", () => {
  test("200 - Successfull fetch one module by Id from database", async () => {
    const res = await request(app)
      .get('/modules/5')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ GET /modules/:id ~ test1:", status, body, '<<< LOG')
    expect(status).toBe(200)
    expect(body).toHaveProperty('id', 5)
    expect(body).toHaveProperty("createdAt", expect.any(String))
    expect(body).toBeInstanceOf(Object)
  })
  test("404 - Failed to find a module", async () => {
    const res = await request(app)
      .get('/modules/999')
      .set('Authorization', 'Bearer ' + access_token_user)
    const { status, body } = res

    console.log("🚀 ~ GET /pub/lodgings/:id ~ test2:", status, body, '<<< LOG')
    expect(status).toBe(404)
    expect(body).toHaveProperty('message', 'Module not found')
  })
})