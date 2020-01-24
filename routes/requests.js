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
    "absolute": {
      "enabled": false,
    },
    "busy": {
      "enabled": false,
    },
    "unanswered": {
      "enabled": false,
    },
    "unreachable": {
      "enabled": false,
    }
  }
  : {
    "absolute": {
      "enabled": true,
      "forwardingMsisdn": "79876543210"
    },
    "busy": {
      "enabled": false,
    },
    "unanswered": {
      "enabled": false,
    },
    "unreachable": {
      "enabled": false,
    }
  }

router.get('/callforwarding', (req, res) => {
  res.json(getResponse({
    data: getCallForwardingData(),
  }))
  isConnected = !isConnected
})

module.exports = router
