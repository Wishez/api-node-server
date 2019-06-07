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

    myLot,
  }
)

const SMS = 'SMS'
const VOICE = 'VOICE'
const DATA = 'DATA'
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
  res.json(getResponse({
    data: lots,
  }))
})

router.post('/statistics', (req, res) => {
  res.json(getResponse())
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

router.post('/created', (req, res) => {
  console.log(typeof req.body)
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
