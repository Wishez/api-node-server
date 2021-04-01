const router = require('express').Router()
const fs = require('fs')
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
  PAYMENTS: 'payments',
  INTERNET: 'internet',
  HOME28: 'home28',
  TARIFFS: 'tariffs',
  HOME2: 'home2',
  SUBSCRIBER_ARTICLE: 'subscriber-is-not-registered',
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

router.get('/search', (req, res) => {
  res.json(searchResult)
})

const configs = [
  { url: '/tariff/everywhere-online', contentName: ContentNames.EVERYWHERE },
  { url: '/tariff/classic', contentName: ContentNames.CLASSIC },
  { url: '/tariff/premium', contentName: ContentNames.PREMIUM },
  { url: '/journal/category/mobile', contentName: ContentNames.MOBILE },
  { url: '/home/test', contentName: ContentNames.HOME },
  { url: '/help', contentName: ContentNames.HELP },
  { url: '/journal/category/mobile', contentName: ContentNames.MOBILE_CATEGORY },
  { url: '/mobile/roaming', contentName: ContentNames.ROAMING },
  { url: '/tizer', contentName: ContentNames.TIZER },
  { url: '/tariff/online', contentName: ContentNames.ONLINE },
  { url: '/banner|/lk', contentName: ContentNames.BANNER },
  { url: '/roaming', contentName: ContentNames.ROAMING },
  { url: '/journal', contentName: ContentNames.JOURNAL },
  { url: '/feedback', contentName: ContentNames.FEEDBACK },
  { url: '/promo2', contentName: ContentNames.PROMO2 },
  { url: '/opros', contentName: ContentNames.OPROS },
  { url: '/resume', contentName: ContentNames.RESUME },
  { url: '/connection-request1', contentName: ContentNames.CONNECTION_REQUEST },
  { url: '/profile-settings', contentName: ContentNames.PROFILE_SETTINGS },
  { url: '/payments', contentName: ContentNames.PAYMENTS },
  { url: '/market/internet', contentName: ContentNames.INTERNET },
  { url: '/home28', contentName: ContentNames.HOME28 },
  { url: '/tariffs', contentName: ContentNames.TARIFFS },
  { url: '/home2', contentName: ContentNames.HOME2 },
  { url: '/subscriber-is-not-registered', contentName: ContentNames.SUBSCRIBER_ARTICLE },
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

module.exports = router
