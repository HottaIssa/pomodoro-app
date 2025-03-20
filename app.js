const btnStart = document.getElementById('btn-start')
const btnPause = document.getElementById('btn-pause')
const btnReset = document.getElementById('btn-reset')
const spanSeconds = document.getElementById('second')
const spanMinutes = document.getElementById('minute')
const endSound = document.getElementById('end-sound')
let state = true
let myInterval

const countdownMinutes = () => {
  let sessionAmount =
    Number.parseInt(spanMinutes.textContent) * 60 +
    Number.parseInt(spanSeconds.textContent)
  if (state) {
    state = false
    const updateSeconds = () => {
      let minutesLeft = Math.floor(sessionAmount / 60)
      let secondsLeft = sessionAmount % 60

      sessionAmount--

      spanMinutes.innerText = minutesLeft > 9 ? minutesLeft : '0' + minutesLeft
      spanSeconds.innerText = secondsLeft > 9 ? secondsLeft : '0' + secondsLeft

      if (minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(myInterval)
        endSound.autoplay = true
        endSound.play()
      }
    }
    myInterval = setInterval(updateSeconds, 1000)
  } else {
    clearInterval(myInterval)
    state = true
  }
}

btnStart.addEventListener('click', () => {
  countdownMinutes()
  btnStart.disabled = true
  btnPause.disabled = false
})
btnPause.addEventListener('click', () => {
  countdownMinutes()
  btnStart.disabled = false
  btnReset.disabled = false
  btnPause.disabled = true
})
btnReset.addEventListener('click', () => {
  spanMinutes.innerText = '25'
  spanSeconds.innerText = '00'
  btnReset.disabled = true
  btnPause.disabled = true
})
