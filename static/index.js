
let responseOrder = 1
window.addEventListener('load', () => {
  const $resultsList = $('#resultsList')
  const $code302button = $('#code302')
  $code302button.addEventListener('click', () => {
    axios.get('/api/302')
      .then(response => showReuslt($resultsList, response))
  })

  const $code401button = $('#code401')
  $code401button.addEventListener('click', () => {
    axios.get('/api/401')
      .then(console.log)
      .catch(({ response }) => {
        console.log(response)
        const nextLocation = response.headers.location
        console.log('nextLocation', nextLocation)
        window.location.replace(nextLocation)
      })
  })

  const $clearListButton = $('#clearListButton')
  $clearListButton.addEventListener('click', () => {
    $resultsList.innerHTML = ''
    responseOrder = 1
  })
})

function showReuslt($list, response) {
  $list.insertAdjacentHTML('afterbegin', `<li><h3>Response order: ${responseOrder}</h3><p><pre>${JSON.stringify(response, null, 4)}</pre></p></li>`)
  responseOrder += 1
}

function $(selector) {
  return document.querySelector(selector)
}