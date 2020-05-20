const router = require('express').Router()

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

router.get('/check-user-agent-header', (req, res) => {
  res.send(`При запросе установил заголовок User-Agent: 'web'.<br/>Извлёк на сервере заголовок User-Agent: ${req.get('User-Agent')}`)
})

router.get('/contract/numbers', (req, res) => {
  res.json(getResponse({
    data: [
      {
        msisdn: '79773248848',
        status: 'ACTIVATED',
        branchName: 'Москва',
        signDate: '28.05.2019',
        contractNum: '98123476',
      },
      {
        msisdn: '79773248847',
        status: 'PREPARED',
        branchName: 'Москва',
        signDate: '28.05.2019',
        contractNum: '98123476',
      }
    ]
  }))
})

router.post('/tele2pay/payment', (req, res) => {
  res.json(getResponse({
    status: 'REQUEST_ACCEPTED',
    data: {
      paymentId: '13213123',
    }
  }))
})

const banners = [
  [
    { url: '/img/slider/gb_share.png' },
    { url: '/img/slider/lk.png' },
    { url: '/img/slider/devices_offer.png' },
    { url: '/img/slider/lk.png' },
  ],
  [
    { url: '/img/home/panels/coverage.png' },
    { url: '/img/home/panels/numbers.png' },
    { url: '/img/home/panels/tariffs.png' },
    { url: '/img/home/panels/numbers.png' },
  ],
]

let shouldSendError = true
router.get('/banners', (req, res) => {
  if (shouldSendError) {
    res.status(400)
    res.json(getResponse({
      status: 'ERROR',
      data: null,
    }))
  } else {
    res.json(getResponse({
      data: banners[1],
    }))
  }
  shouldSendError = !shouldSendError
})

router.patch('/mia/offers', (req, res) => {
  res.json(getResponse({
    data: null
  }))
})

router.post('/mia/offers', (req, res) => {
  res.json(getResponse({
    data: {
      infoMessage: "Вы получили все доступные коды. Скопируйте последний промокод.",
      promoCode: "157I469M945E5851 и пин - 2776",
      url: "https://shoko.ru/",
    },
  }))
})

router.put('/mia/offers', (req, res) => {
  res.json(getResponse({
    data: null
  }))
})

router.get('/mia/balance', (req, res) => {
  res.json(getResponse({
    data: { value: 2000 },
  }))
})

router.get('/mia/offers', (req, res) => {
  res.json(getResponse({
    data: {
      params: [
        {
          type: 'base',
          image: 'http://skrinshoter.ru/i/261119/1ulRAJyl.png',
          url: '/',
          text: 'Привет! Это Миа, Ваш умный помощник. Я проанализировала Ваши расходы за месяц и подобрала оптимальное предложение',
          title: 'Тариф «Мой&nbsp;онлайн»',
        },
        {
          type: 'tariff',
          id: 1235,
        },
        {
          image: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/youtube-512.png',
          title: 'Безлимитный трафик',
          text: 'Безлимит на YouTube',
          id: '54321',
          uom: 'rub',
          type: 'personal',
        },
        {
          id:'12345',
          uom:'mb',
          type:'microupsale',
        },
        {
          id:'12345',
          uom:'min',
          type:'microupsale',
        },
        {
          title: 'Маячок',
          text: 'Услуга доступна при балансе менее 5 руб.',
          id: '4967',
          uom: 'rub',
        },
        {
          type: 'loyalty',
          title: 'Скидка 20%',
          image: 'https://bb.tele2.ru/loy/katok191.jpg',
          text: 'Получите билеты со скидкой 20% на каток в Парке Горького',
          description: 'Акция действительна с 22.11.2019 г. до 09.03.2020 г...',
          buttonText: 'Подключить',
          url: 'amediateka.ru',
        },
        {
          id: 1111,
        },
        {
          "type":"tariffAdvantages",
          "text":"WhatsApp и еще 5 безлимитных мессенджеров",
          "image":"http://api.tele2.ru/api/media/asset?mediaId=m140583"
         },
         {
          "type":"tariffAdvantages",
          "text":"Instagram и еще 2 безлимитных соц. сети",
          "image":"http://api.tele2.ru/api/media/asset?mediaId=m140584"
         },
         {
          "type":"tariffAdvantages",
          "text":"<a href=\"/promo/yandex-plus\">Все преимущества «Яндекс.Плюс»</a>",
          "image":"http://api.tele2.ru/api/media/asset?mediaId=m244684"
         },
      ],
      reasonToBelieveTitle: 'Преимущества предложения',
      reasonsToBelieve: [
        {
          image: { uri: 'http://skrinshoter.ru/i/271119/dgMkRkr8.png' },
          text: 'Используйте остатки минут, ГБ и SMS в следующем месяце',
        },
        {
          image: { uri: 'http://skrinshoter.ru/i/271119/dgMkRkr8.png' },
          text: 'Общайтесь с абонентами Tele2 России без расхода пакета минут',
        },
        {
          image: { uri: 'http://skrinshoter.ru/i/271119/dgMkRkr8.png' },
          text: 'Пользуйтесь в поездках по России минутами, ГБ и SMS из своего тарифа',
        },
      ],
      minPacketSize: '800 min.',
      dataPacketSize: '0 gb',
      amount: 803,
      tarifficationType: 'month',
      discountInfo: 'Скидка 5% на 1 месяц',
      discountAmount: 795,
      type: 'loyalty',
      activationOfferId: 'sOfferId',
    }
  }))
})

let isConnected = false
const getCallForwardingData = () => isConnected
  ? {
    unansweredDefaultDelay: 10,
    options: [
      {
        type: "absolute",
        "enabled": false,
      },
      {
        type: "busy",
        "enabled": false,
      },
      {
        type: "unanswered",
        "enabled": false,
      },
      {
        type: "unreachable",
        "enabled": false,
      }
    ],
  }
  : {
    unansweredDefaultDelay: 10,
    options: [
      {
        type: "absolute",
        "enabled": true,
        "forwardingMsisdn": "79876543210"
      },
      {
        type: "busy",
        "enabled": false,
      },
      {
        type: "unanswered",
        "enabled": false,
      },
      {
        type: "unreachable",
        "enabled": false,
      }
    ],
  }

router.get('/callforwarding', (req, res) => {
  res.json(getResponse({
    data: getCallForwardingData(),
  }))
  isConnected = !isConnected
})

router.patch('/callforwarding', (req, res) => {
  res.json(getResponse({
    data: null
  }))
  isConnected = !isConnected
})

let connected = [
  {"msisdn":"79508408321"},
  {"msisdn":"79773248849"},
  {"msisdn":"79775255819"},
  {"msisdn":"79777127959", master: true},
]
let candidates = [
  {"msisdn":"79773248847", errorMessage: "Особый текст ошибки"},
  {"msisdn":"79776930497"},
]
let slaveNumbers = [
  {"msisdn":"79773248849","state":"pending"},
  {"msisdn":"79773248847","state":"active"},
  {"msisdn":"79777127959","state":"active"},
  {"msisdn":"79775255818","state":""},
  {"msisdn":"79775255819","state":""},
  {"msisdn":"79777127960","state":""},
  {"msisdn":"79776930497","state":"pending"},
]

const getMsisdnFromSlaveNumbers = neededMsisdn => slaveNumbers.findIndex(({ msisdn }) => msisdn === neededMsisdn)

router.get('/commonAccount', (req, res) => {
  res.json(getResponse({
    data: {
      connected,
      available: candidates,
    },
  }))
})

router.put('/commonAccount/members', (req, res) => {
  const { member, master } = req.body
  if (!connected.some((number) => number.master)) connected.push({ msisdn: master, master: true })
  connected.push(slaveNumbers.find(({ msisdn }) => member === msisdn))

  const candidateIndex = getMsisdnFromSlaveNumbers(member)
  candidates = [...candidates.slice(0, candidateIndex), ...candidates.slice(candidateIndex + 1)]
  res.json(getResponse({
    data: { connected, candidates }
  }))
})

router.delete('/commonAccount/members', (req, res) => {
  const { member } = req.body
  if (connected.length <= 2) {
    connected.map((number) => {
      delete number.master
      candidates.push(number)
    })
    connected = []
  } else {
    const msisdnIndex = connected.findIndex(({ msisdn }) => msisdn === member)
    const numberToDelete = connected[msisdnIndex]
    if (numberToDelete) {
      delete numberToDelete.master
      candidates.push(numberToDelete)
      connected = [...connected.slice(0, msisdnIndex), ...connected.slice(msisdnIndex + 1)]
    }
  }
  res.json(getResponse({
    data: connected,
  }))
})

router.put('/commonAccount/master', (req, res) => {
  const currentMaster = connected.find(({ master }) => master)
  if (currentMaster) delete currentMaster.master

  const { member } = req.body
  const targetMaster = connected.find(({ msisdn }) => msisdn === member )
  targetMaster.master = true
  res.json(getResponse({
    data: connected,
  }))
})

router.get('/slaves', (req, res) => {
  res.json(getResponse({
    data: slaveNumbers,
  }))
})

router.put('/slaves', (req, res) => {
  const number = slaveNumbers.find(({ msisdn }) => msisdn === String(req.body))
  number.state = 'pending'
  setTimeout(() => (number.state = 'active'), 1000 * 20)
  candidates.push(number)
  res.json(getResponse({
    data: slaveNumbers,
  }))
})

router.patch('/slaves', (req, res) => {
  const { member } = req.body
  const number = slaveNumbers.find(({ msisdn }) => msisdn === member)
  number.state = ''
  res.json(getResponse({
    data: slaveNumbers,
  }))
})

const simStatuses = {
  BLOCKED: 'BLOCKED',
  SUSPENDED: 'SUSPENDED',
  ACTIVATED: 'ACTIVATED',
}
let simStatus = simStatuses.SUSPENDED
const toggleSimStatus = () => {
  simStatus = simStatus === simStatuses.ACTIVATED ? simStatuses.SUSPENDED : simStatuses.ACTIVATED
}
router.put('/simStatus', (req, res) => {
  const status = req.body
  // simStatus = status
  res.json(getResponse({
    status: 'ERROR',
    data: {
      status: status.status
    },
  }))
})

router.get('/simStatus', (req, res) => {
  const status = req.body
  res.json(getResponse({
    // message: 'Unlockability undefined',
    // status: 'ERROR',
    data: {
      status: simStatus,
      unlockability: true,
    },
  }))
})

const moment = require('moment')
router.get('/changeNumber', (req, res) => {
  res.json(getResponse({
    status: 'CHANGE_FORBIDDEN',
    data: {
      changeDay: moment().subtract(7, 'days').toISOString(),
    },
  }))
})

router.get('/profile', (req, res) => {
  res.json(getResponse({
    status: 'OK',
    data: {
      sitePrefix: "rostov",
      siteId: "siteROSTOV",
      fullName: "Тестовый Линииелс Зни 79989",
      email: null,
      avatar: null,
      avatarId: null,
      address: {},
      clientType: "ololo",
      mnpType: null,
      virtualNumberConnected: false,
    },
  }))
})

const createNumbers = (quantity = 100000) => Array.from(Array(quantity)).map(
  () => ({ number: `7${String(Math.floor(Math.random() * 999999999999)).substr(0, 10)}` })
)
const firstCategoryNumbers = createNumbers()
const secondCategoryNumbers = createNumbers()
const thirdCategoryNumbers = createNumbers()
const categories = [
  {
    amount: 150,
    id: 4,
    numbers: thirdCategoryNumbers,
  },
  {
    amount: 3000,
    id: 2,
    numbers: firstCategoryNumbers,
  },
  {
    amount: 9000,
    id: 3,
    numbers: secondCategoryNumbers,
  },
]
const lastIndeces = {}
const getNumbersPortion = (category, count) => {
  const { id, numbers } = category
  const lastIndex = lastIndeces[id] || 0
  const afterLastElementIndex = Number(lastIndex) + Number(count)
  const numbersPortion  = numbers.slice(lastIndex, afterLastElementIndex)
  if (!numbersPortion.length) return null

  const reuslt = {
    ...category,
    numbers: numbersPortion,
  }
  lastIndeces[id] = afterLastElementIndex
  return reuslt
}

const compact = require('lodash/compact')

router.get('/changenumber/numbers', (req, res) => {
  const { count = 20, category } = req.query
  let result = categories
  if (count && category) {
    const specialCategory = categories.find(({ id }) => category == id) || {}
    result = [getNumbersPortion(specialCategory, count)]
  } else if (count) result = categories.map(category => getNumbersPortion(category, count))
  res.json(getResponse({
    data: {
      categories: compact(result),
    },
  }))
})

let codeValidTo
let quantityAttempts = 0
router.put('/changenumber/numbers', (req, res) => {
  const { code } = req.body
  let status = 'OK'
  if (!codeValidTo) {
    codeValidTo = Number(moment().add('minutes', 1).format('x'))
  } else {
    const isExpired = (moment().diff(codeValidTo, 's') * -1) <= 0
    status = Math.round(Math.random()) ? 'CODE_NOT_FOUND' : 'CODE_ALREADY_EXIST'
    if (isExpired) codeValidTo = undefined
  }
  const isCodeFilled = code && code === '123456'
  if (code && code === '123456') {
    status = 'OK'
    quantityAttempts = 0
  }
  else if (code && quantityAttempts === 1) status = 'FAILED_ATTEMPTS'
  else if (code) {
    status = 'BAD_CODE'
    quantityAttempts += 1
  }
  res.json(getResponse({
    status,
    data: {
      codeValidTo,
    },
  }))
})

router.get('/changenumber/reserve', (req, res) => {
  res.json(getResponse({
    status: 'TEMPORARY_FORBIDDEN',
    data: {
      availableSince: moment().add('days', '10').toISOString(),
    }
  }))
})

router.post('/changenumber/reserve', (req, res) => {
  res.json(getResponse({
    status: 'OK',
    data: null
  }))
})

router.get('/changenumber/availability', (req, res) => {
  res.json(getResponse({
    status: 'OK',
    data: {
      number: ''//'79859051255',
    },
  }))
})


router.get('/changenumber/balance', (req, res) => {
  res.json(getResponse({
    data: { value: 3000 },
  }))
})

router.get('/changenumber/random-portion-of-numbers', (req, res) => {
  const randomCategoryId = Math.floor(Math.random() * categories.length)
  const count = 20
  res.json(getResponse({
    data: {
      categories: [getNumbersPortion(categories[randomCategoryId], count)]
    },
  }))
})

module.exports = router
