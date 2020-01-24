
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

router.get('/api/302', (req, res) => {
  console.log(req.url)
  res.set('Location', '/success')
  res.status(302).send('Go to success')
})


router.get('/api/503', (req, res) => {
  res.status(503).json(getResponse({ status: 'ERROR' }))
})

router.get('/api/400', (req, res) => {
  res.status(400).json(getResponse({ status: 'ERROR' }))
})

router.get('/api/401', (req, res) => {
  console.log(req.url)
  res.set('Location', '/success')
  res.status(401).send('Go to success')
})

router.get('/success', (req, res) => {
  console.log(req)
  res.set('Location', '/success')
  res.send('\<h1\>It\'s success page\'s html content!\</h1\>')
})

router.get('/redirect/tele2', (req, res) => {
  res.set('Location', 'https://tele2.ru')
  res.status(302).end()
})

router.get('/redirect/main', (req, res) => {
  return res.redirect('/')
})

module.exports = router
