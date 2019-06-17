const router = require('express').Router()

router.get('/check-user-agent-header', (req, res) => {
  res.send(`При запросе установил заголовок User-Agent: 'web'.<br/>Извлёк на сервере заголовок User-Agent: ${req.get('User-Agent')}`)
})

router.get('/contract/numbers', (req, res) => {
  res.json({
    meta: {
      status: 'OK',
      statusCode: 200,
    },
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
  })
})

module.exports = router
