const router = require('express').Router()

const getLot = ({ id, trafficType, volumeUom, status, myLot }) => (
  {
    id,

    seller: {
      name: 'shiningfinger',
      message: 'This is awesome api',
    },
    trafficType,

    volume: {
      value: 50.0,
      uom: volumeUom,
    },

    cost: {
      amount: 20.40,
      currency: 'RUB',
    },

    commission: {
      amount: 20.40,
      currency: 'RUB',
    },

    status,

    creationDate: new Date(new Date().getTime() - 100000).toISOString(),
    expirationDate:	new Date(new Date().getTime() + 100000).toISOString(),

    my: myLot,
  }
)

const SMS = 'sms'
const VOICE = 'voice'
const DATA = 'data'
const volumeUoms = {
  [SMS]: 'sms',
  [VOICE]: 'min',
  [DATA]: 'gb',
}

let lastId = 6
const lots = [
  { id: '1', trafficType: VOICE, volumeUom: volumeUoms[VOICE], status: 'active', myLot: true },
  { id: '2', trafficType: SMS, volumeUom: volumeUoms[SMS], status: 'redeemed', myLot: true },
  { id: '3', trafficType: DATA, volumeUom: volumeUoms[DATA], status: 'expired', myLot: false },
  { id: '4', trafficType: SMS, volumeUom: volumeUoms[SMS], status: 'revoked', myLot: false },
  { id: '5', trafficType: VOICE, volumeUom: volumeUoms[VOICE], status: 'deleted', myLot: true },
  { id: '6', trafficType: DATA, volumeUom: volumeUoms[DATA], status: 'bought', myLot: true },
].map(getLot)

const getResponse = (config = {}) => {
  const { status = 'OK', message = '', data = null } = config
  return {
    meta: {
      status,
      message,
    },
    data,
  }
}

router.get('/', (req, res) => {
  res.json({"meta":{"status":"OK","message":null},"data":[{"id":"6163051055449922018","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.843Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.843Z","my":true},{"id":"2290264564810907141","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.844Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.844Z","my":false},{"id":"5813206401922408299","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.845Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T13:56:13.138Z","my":false},{"id":"5659370630370312250","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.844Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T13:56:13.138Z","my":true},{"id":"-7258021887189584009","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"redeemed","creationDate":"2019-06-27T11:30:07.844Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.844Z","my":true},{"id":"-8104154499759963169","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"redeemed","creationDate":"2019-06-27T11:30:07.845Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.845Z","my":true},{"id":"-6201674651475324377","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"data","volume":{"value":3,"uom":"gb"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:22.88Z","expirationDate":"2019-06-28T21:00:00Z","statusChangeDate":"2019-06-27T11:30:22.88Z","my":true},{"id":"7530303282286614994","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":100,"uom":"sms"},"cost":{"amount":50.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-25T14:45:27.628Z","expirationDate":"2019-07-30T21:00:00Z","statusChangeDate":"2019-06-25T14:46:17.6Z","my":true},{"id":"-4438717376791592691","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":100,"uom":"sms"},"cost":{"amount":50.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-25T14:45:27.627Z","expirationDate":"2019-07-30T21:00:00Z","statusChangeDate":"2019-06-25T14:45:48.632Z","my":true},{"id":"-6189787113359105046","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.846Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.846Z","my":true},{"id":"-4369975644420553131","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.845Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.845Z","my":true},{"id":"1554678418410137249","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.846Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.846Z","my":true},{"id":"2430413191011376288","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.847Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.847Z","my":true},{"id":"7833246071461159399","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.847Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.847Z","my":true},{"id":"2867985069992455232","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:07.847Z","expirationDate":"2019-06-27T21:00:00Z","statusChangeDate":"2019-06-27T11:30:07.847Z","my":true},{"id":"6062287440395123702","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"data","volume":{"value":3,"uom":"gb"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:22.879Z","expirationDate":"2019-06-28T21:00:00Z","statusChangeDate":"2019-06-27T11:30:22.879Z","my":true},{"id":"5028574660715861913","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"data","volume":{"value":3,"uom":"gb"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:22.88Z","expirationDate":"2019-06-28T21:00:00Z","statusChangeDate":"2019-06-27T13:56:01.55Z","my":true},{"id":"-6222991349890833731","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"data","volume":{"value":3,"uom":"gb"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T11:30:22.88Z","expirationDate":"2019-06-28T21:00:00Z","statusChangeDate":"2019-06-27T13:55:54.634Z","my":true},{"id":"-8597620318150221099","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T13:55:45.35Z","expirationDate":"2019-06-28T21:00:00Z","statusChangeDate":"2019-06-27T13:56:06.54Z","my":true},{"id":"-3897458109282854057","seller":{"name":"Анонимный продавец","emojis":[]},"trafficType":"sms","volume":{"value":3,"uom":"sms"},"cost":{"amount":2.00,"currency":"rub"},"commission":{"amount":0.00,"currency":"rub"},"status":"active","creationDate":"2019-06-27T13:55:45.349Z","expirationDate":"2019-06-28T21:00:00Z","statusChangeDate":"2019-06-27T13:55:45.349Z","my":true}]})
  // res.json(getResponse({
  //   data: lots,
  // }))
})

const statistics = [
  {
    link: 'data:image/jpeg;base64,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',
    name: 'Cat',
  },
  {
    link: 'data:image/jpeg;base64,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',
    name: 'Cat',
  }
]
router.get('/statistics', (req, res) => {
  res.json(getResponse({
    data: statistics,
  }))
})

router.put('/bought', (req, res) => {
  res.json(getResponse({
    status: 'bp_ok_redeemLot',
    data: {
      selectedLots: 322,
      redeemedLots: 228,
    },
  }))
})

router.put('/created', (req, res) => {
  const { trafficType, number } = req.body.operatorLotParams
  Array(number).fill(0).forEach(() => {
    lastId++
    lots.push(getLot({
      id: String(lastId),
      trafficType,
      volumeUom: volumeUoms[trafficType],
      status: 'active',
      myLot: true
    }))
  })
  res.json(getResponse())
})

router.patch('/created', (req, res) => {
  res.json(getResponse({
    status: 'bp_ok_deleteLotTele2',
  }))
})

module.exports = router
