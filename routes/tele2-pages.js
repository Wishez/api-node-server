const router = require('express').Router()
const fs = require('fs')
const axios = require('axios');

const tele2localhost = 'localhost:3000'
const tariffContent = JSON.parse(fs.readFileSync(__dirname + '/content/everywhere-online.json', { encoding: 'utf-8' }))
const mobileCategoryContent = JSON.parse(fs.readFileSync(__dirname + '/content/mobile.json', { encoding: 'utf-8' }))


function testWithTime(name, fn) {
  const start = Date.now()
  fn()
  const past = new Date(Date.now() - start).getSeconds()
  console.log(`The test ${name} passed for ${past} seconds.`)

}
router.get('/tariff/everywhere-online', (req, res) => {
  const { format } = req.query
  console.log(format)
  if (format === 'json') res.json(tariffContent)
  else {
    axios.get(`${tele2localhost}/tariff/everywhere-online`)
      .then((response) => res.send(response.data))
  }
})

router.get('/journal/category/mobile', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(mobileCategoryContent)
})

module.exports = router
