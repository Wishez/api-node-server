
let responseOrder = 1
window.addEventListener('load', () => {
  console.log('load')
  const { pathname, search, hash } = window.location
  window.postMessage(`${pathname}${search}${hash}`, '*')
  const $resultsList = $('#resultsList')

  onButtonClickDoGetRequest({
    buttonId: '#check-t2-layout',
    url: 'http://msk-test.tele2.ru:8080/journal/article/Onedaysakhalin',
  })
    .then(response => showReuslt($resultsList, response))

  onButtonClickDoGetRequest({
    buttonId: '#show-user-agent',
    url: '/api/check-user-agent-header',
    headers: { 'User-Agent': 'web' },
  })
    .then(response => showReuslt($resultsList, response.data, true))

  onButtonClickDoGetRequest({
    buttonId: '#check-blog',
    url: 'https://filipp-zhuravlev.ru/api/v1/article',
  })
    .then(response => showReuslt($resultsList, response))

  onButtonClickDoGetRequest({
    buttonId: '#code302',
    url: '/api/302'
  })
    .then(response => showReuslt($resultsList, response))

  onButtonClickDoGetRequest({
    buttonId: '#code401',
    url: '/api/401'
  })
    .then(console.log)
    .catch(({ response }) => {
      console.log(response)
      const nextLocation = response.headers.location
      console.log('nextLocation', nextLocation)
      window.location.replace(nextLocation)
    })

  const $clearListButton = $('#clearListButton')
  $clearListButton.addEventListener('click', () => {
    $resultsList.innerHTML = ''
    responseOrder = 1
  })
})

function onButtonClickDoGetRequest({ buttonId, url, headers = {} }) {
  return new Promise((resolve, reject) => {
    const $button = $(buttonId)
    $button.addEventListener('click', () => {
      axios.get(url, { headers })
        .then(resolve)
        .catch(reject)
    })
  })
}
function showReuslt($list, response, isPlainText) {
$list.insertAdjacentHTML(
  'afterbegin',
  `<li><h3>Response order: ${responseOrder}</h3><p>
    ${isPlainText ? response : `<pre>${JSON.stringify(response, null, 4)}</pre>`}
  </p></li>`
)
  responseOrder += 1
}

function $(selector) {
  return document.querySelector(selector)
}