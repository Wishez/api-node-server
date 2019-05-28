window.addEventListener('load', () => {
  console.log('load iframe')
  console.log(window.frameElement.dataset.url)
  window.addEventListener("message", (event) => {
    window.parentEvent = event
    console.log(window.parentEvent)
  }, false);
})