import getMqConfig from "./getMqConfig"

let timeout
let checkDebounce = false

function onMatchMedia() {
  if (checkDebounce) return

  checkDebounce = true

  timeout = setTimeout(() => {
    this.config = getMqConfig.call(this)

    this.config.disable ? this.disable() : this.reinit()

    checkDebounce = false
    clearTimeout(timeout)
  }, 500)
}

export default onMatchMedia
