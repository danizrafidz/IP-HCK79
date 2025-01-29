const express = require('express')
const app = express()
const router = require("./routes")

const errorHandler = require('./middlewares/errorHandler')
const requestActivity = require('./middlewares/requestActivity')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(requestActivity)

app.use("/", router)

app.use(errorHandler)

module.exports = app