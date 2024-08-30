import getMqConfig from "./getMqConfig"

let timeout
let checkDebounce = false

function onMatchMedia() {
	if (checkDebounce) return

	checkDebounce = true

	timeout = setTimeout(() => {
		this.currentSettings = getMqConfig.call(this)

		this.currentSettings.disable ? this.disable() : this.reinit()

		checkDebounce = false
		clearTimeout(timeout)
	}, 200)
}

export default onMatchMedia
