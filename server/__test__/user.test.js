const { test, expect, beforeAll, afterAll } = require('@jest/globals')
const { Team, User, sequelize } = require('../models')
const app = require('../app')
const request = require('supertest')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken, verifyToken } = require('../helpers/jwt')

const admin = {
  email: "admin.alpha@mail.com",
  password: "adminalpha",
};

const user = {
  email: "red.romeo@mail.com",
  password: "redromeo",
};

valid_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzM4MTY2OTg3fQ.jZOFp2iJoI_RvlhxjNM5SYdH3t_z6rPLtHld2506PPQ'
invalid_access_token = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'

beforeAll(async () => {
  let teams = require('../data/teams.json').map((team) => {
    team.createdAt = new Date()
    team.updatedAt = new Date()
    return team
  })

  let users = require('../data/users.json').map((user) => {
    user.createdAt = new Date()
    user.updatedAt = new Date()
    user.password = hashPassword(user.password)
    return user
  })

  await sequelize.queryInterface.bulkInsert('Teams', teams)
  await sequelize.queryInterface.bulkInsert('Users', users)

})

afterAll(async () => {
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

describe("POST /login", () => {
  test("201 - Successfully login and get access_token", async () => {
    const res = await request(app)
      .post('/login')
      .send(user)
    const { body, status } = res;

    console.log("🚀 ~ POST /login ~ test1", status, body, '<<< LOG')
    expect(status).toBe(200)
    expect(body).toHaveProperty("access_token", expect.any(String));
    expect(verifyToken(body.access_token).id).toBe(2)
  })
  test("400 - Email not inputted", async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: "",
        password: "redromeo"
      })
    const { body, status } = res;

    console.log("🚀 ~ POST /login ~ test2", status, body, '<<< LOG')
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", "Email is required")
  })
  test("400 - Password not inputted", async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'red.romeo@mail.com',
        password: ""
      })
    const { body, status } = res;

    console.log("🚀 ~ POST /login ~ test3", status, body, '<<< LOG')
    expect(status).toBe(400)
    expect(body).toHaveProperty("message", "Password is required")
  })
  test("401 - Email inputted invalid", async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'invalidemail',
        password: "redromeo"
      })
    const { body, status } = res;

    console.log("🚀 ~ POST /login ~ test4", status, body, '<<< LOG')
    expect(status).toBe(401)
    expect(body).toHaveProperty("message", "Invalid email/password")
  })
  test("401 - Password inputted invalid", async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'red.romeo@mail.com',
        password: "invalidpassword"
      })
    const { body, status } = res;

    console.log("🚀 ~ POST /login ~ test5", status, body, '<<< LOG')
    expect(status).toBe(401)
    expect(body).toHaveProperty("message", "Invalid email/password")
  })
})

describe("GET /user", () => {
  test("200 - Get current logged-in user from database", async () => {
    const res = await request(app)
      .post('/login')
      .set('Authorization', 'Bearer ' + valid_access_token)
    const { body, status } = res;

    console.log("🚀 ~ POST /user ~ test1", status, body, '<<< LOG')
    expect(status).toBe(200)
    expect(body).toHaveProperty("id", 2)
  })
})