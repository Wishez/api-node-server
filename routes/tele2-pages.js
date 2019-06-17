const router = require('express').Router()
const fs = require('fs')
const axios = require('axios');

const tele2localhost = 'localhost:3000'
const tariffContent = fs.readFileSync(__dirname + '/content/everywhere-online.json', { encoding: 'utf-8' })

router.get('/tariff/everywhere-online', (req, res) => {
  const { format } = req.query
  console.log(format)
  if (format === 'json') res.json(JSON.parse(tariffContent))
  else {
    axios.get(`${tele2localhost}/tariff/everywhere-online`)
      .then((response) => {
        console.log(response)
        res.send(response.data)
      })
  }
})

module.exports = router
