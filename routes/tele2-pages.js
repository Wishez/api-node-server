const router = require('express').Router()
const fs = require('fs')
const axios = require('axios');
const searchResult = require('./searchResult')

const loadFile = (url) => fs.readFileSync(__dirname + url, { encoding: 'utf-8' })
const getContent= (name) => JSON.parse(loadFile(`/content/${name}.json`))
const ContentNames = {
  EVERYWHERE: 'everywhere-online',
  MOBILE: 'mobile',
  CLASSIC: 'classic',
  PREMIUM: 'premium',
  MOBILE_CATEGORY: 'mobile-category',
  HELP: 'help',
  HOME: 'home',
  ONLINE: 'my-online_new',
}

const contents = Object.values(ContentNames)
  .reduce((result, key) => ({
    ...result,
    [key]: getContent(key),
  }), {})

router.get('/tariff/everywhere-online', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(contents[ContentNames.EVERYWHERE])
})

router.get('/journal/category/mobile', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(contents[ContentNames.MOBILE])
})

router.get('/tariff/premium', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(contents[ContentNames.PREMIUM])
})

router.get('/tariff/classic', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(contents[ContentNames.CLASSIC])
})

router.get('/journal/category/mobile', (req, res) => {
  const { format } = req.query
  if (format === 'json') res.json(contents[ContentNames.MOBILE_CATEGORY])
})

router.get('/help', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.HELP])
  
  // res.send(loadFile('/content/ocwidget.js'))
})

router.get('/home', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.HOME])
})

router.get('/search', (req, res) => {
  res.json(searchResult)
})

router.get('/tariff/online', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.ONLINE])
})

module.exports = router
