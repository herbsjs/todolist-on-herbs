const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const generateRoutes = require('../api/rest/routes')
const user = require('../config/user')
const app = express()

app.use(bodyParser.json({ strict: false }))

app.get('/api', function (req, res) {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  req.user = user
  next()
})
app.use(express.json())

const routes = new express.Router()
generateRoutes(routes)
app.use('/api', routes)

module.exports = serverless(app)
