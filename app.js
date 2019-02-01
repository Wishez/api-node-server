const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const _ = require('./helpers')

const requests = require('./routes/requests')
const codeStatuses = require('./routes/code-statuses')

const app = express()
const staticPath = '/static'
app.use(staticPath, express.static(_.resolvePath('static')))
app.use(express.static(_.resolvePath('node_modules')))
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(requests)
app.use(codeStatuses)

app.use('/', (req, res) => {
  res.sendFile(_.resolvePath('static/index.html'))
})

const PORT = 4080
app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}!`)
})

