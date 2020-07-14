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
  TIZER: 'tizer',
  JOURNAL: 'journal',
  ROAMING: 'roaming',
  FEEDBACK: 'feedback',
  PROMO2: 'promo2',
  CONNECTION_REQUEST: 'connection-request1',
  OPROS: 'opros',
  RESUME: 'resume',
  PROFILE_SETTINGS: 'profileSettings',
  // PAYMENTS: 'payments'
}


router.get('/esia/redirect', (req, res) => {
  res.status(302)
  res.set('Location', 'https:/msk.uat-02.corp.tele2.ru/redirect-processing?resource-type=esia&code=1234')
  res.end()
})

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

router.get('/home/test', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.HOME])
})

router.get('/search', (req, res) => {
  res.json(searchResult)
})

router.get('/tariff/online', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.ONLINE])
})

router.get('/tizer', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.TIZER])
})

router.get('/mobile/roaming', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.TIZER])
})

router.get('/journal', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.JOURNAL])
})

router.get('/roaming', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.ROAMING])
})

router.get('/banner|/lk', (req, res) => {
  if (req.query.format === 'json') res.json(contents[ContentNames.BANNER])
})

const configs = [
  { url: '/feedback', contentName: ContentNames.FEEDBACK },
  { url: '/promo2', contentName: ContentNames.PROMO2 },
  { url: '/opros', contentName: ContentNames.OPROS },
  { url: '/resume', contentName: ContentNames.RESUME },
  { url: '/connection-request1', contentName: ContentNames.CONNECTION_REQUEST },
  { url: '/profile-settings', contentName: ContentNames.PROFILE_SETTINGS },
  { url: '/payments', contentName: ContentNames.PAYMENTS },
]
configs.forEach(({ url, contentName }) => {
  router.get(url, (req, res) => {
    if (req.query.format === 'json') res.json(contents[contentName])
  })
})


router.get('/check', (req, res) => {
  console.log('got it')
  res.end()
})

const getResponse = ({
  data,
  status = 'OK',
  message = null,
}) => ({
  meta: {
    status,
    message,
  },
  data,
})


module.exports = router
