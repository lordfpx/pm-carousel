import build from "./build"

function init() {
	this.activePage = 0
	this._interval = null
	this.autoplayStatus = "stop" // to manage play/stop

	// touch
	this._metrics = {
		touchstartX: 0,
		touchmoveX: 0,
		moveX: 0,
		slideWidth: 0,
	}

	build.call(this)

	this.changeActive(this.activePage)

	// autoplay should be a number, not a boolean
	if (this.currentSettings.autoplay > 1 && this.nodes.playstop) {
		// can't autoplay without loop
		this.autoplayStatus = "play"
		this.play()
	} else {
		this.stop()
	}
}

export default init
