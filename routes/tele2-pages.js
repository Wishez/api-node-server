const router = require('express').Router()
const fs = require('fs')
const axios = require('axios');

const tele2localhost = 'localhost:3000'
const tariffContent = JSON.parse(fs.readFileSync(__dirname + '/content/everywhere-online.json', { encoding: 'utf-8' }))

testWithTime('copy content with JSON', () => {
  const copy = JSON.parse(JSON.stringify(tariffContent))
  return copy
})
testWithTime('copy content with Object.assign', () => {
  const copy = Object.assign({}, tariffContent)
  return copy
})
testWithTime('copy content with spread operator ...', () => {
  let copy = { ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  copy = { ...copy, ...tariffContent }
  return copy
})

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
      .then((response) => {
        console.log(response)
        res.send(response.data)
      })
  }
})

module.exports = router
