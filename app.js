const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const _ = require('./helpers')


const app = express()
const staticPath = '/static'
app.use(staticPath, express.static(_.resolvePath('static')))
app.use(express.static(_.resolvePath('node_modules')))
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ strict: false }))
app.use(bodyParser.urlencoded({ extended: true }))

const requests = require('./routes/requests')
const codeStatuses = require('./routes/code-statuses')
const rokfellerAdminRequests = require('./routes/rokfeller-admin.api')
const tele2Pages = require('./routes/tele2-pages')

app.use('/', tele2Pages)
app.use('/api', requests)
app.use(codeStatuses)

app.use('/api/lots', rokfellerAdminRequests)

app.get('/test', (req, res) => {
  res.sendFile(_.resolvePath('static/templates/test/index.html'))
})

app.get('/webim-chat', (req, res) => {
  res.sendFile(_.resolvePath('static/templates/test/webim.html'))
})

app.get('/', (req, res) => {
  res.sendFile(_.resolvePath('static/index.html'))
})


const PORT = 4080
app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}!`)
})

