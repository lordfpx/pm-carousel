import { ATTR } from "./constants"
import { extend } from "./utils/extend"
import { toJson } from "./utils/toJson"
import getMqConfig from "./getConfig/getMqConfig"
import onMatchMedia from "./getConfig/onMatchMedia"

const DEFAULT = {
	default: {
		loop: true,
		group: 1,
		spaceAround: 0,
		noStartSpace: false,
		autoplay: 0,
	},
}

function getConfig(settings) {
	// data-attribute settings
	const elSettings = toJson(this.el.getAttribute(ATTR))

	// merged settings
	this.settings = extend(true, DEFAULT, settings, elSettings)

	// carousel config
	let config = this.settings.default

	// media query carousel config
	if (this.settings.responsive) {
		// order respinsive widths
		this.settings.responsive.sort(
			(a, b) => parseInt(a.minWidth, 10) - parseInt(b.minWidth, 10)
		)

		config = getMqConfig.call(this)
		this.settings.responsive.forEach((config) => {
			const mql = window.matchMedia(`(min-width: ${config.minWidth})`)
			mql.addEventListener("change", onMatchMedia.bind(this))
		})
	}

	return config
}

export default getConfig
