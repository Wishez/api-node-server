const router = require('express').Router()
const fs = require('fs')
const axios = require('axios');

const getContent= (name) => 
  JSON.parse(fs.readFileSync(__dirname + `/content/${name}.json`, { encoding: 'utf-8' }))
const tele2localhost = 'localhost:3000'
const tariffContent = getContent('everywhere-online')
const mobileCategoryContent = getContent('mobile')
const classic = getContent('classic')
const premium = getContent('premium')

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

router.get('/tariff/premium', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(premium)
})

router.get('/tariff/classic', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(classic)
})

module.exports = router
