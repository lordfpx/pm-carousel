import { ATTR } from "./constants"
import { extend } from "./utils/extend"
import { toJson } from "./utils/toJson"

const DEFAULT = {
	default: {
		loop: true,
		group: 1,
		spaceAround: 0,
		noStartSpace: false,
		autoplay: 0,
	},
}

function getConfig(settings = {}) {
	// get the right config depending on media query
	const getMqConfig = () => {
		const updatedMqConfig = this.settings.responsive
			.slice()
			.reverse()
			.find(
				(mqConfigs) =>
					window.matchMedia(`(min-width: ${mqConfigs.minWidth})`).matches
			)

		return updatedMqConfig
			? { ...this.settings.default, ...updatedMqConfig }
			: this.settings.default
	}

	// on media query change
	let timeout
	let checkDebounce = false

	const onMatchMedia = () => {
		if (checkDebounce) return

		checkDebounce = true

		timeout = setTimeout(() => {
			this.currentSettings = getMqConfig.call(this)

			this.currentSettings.disable ? this.disable() : this.reinit()

			checkDebounce = false
			clearTimeout(timeout)
		}, 200)
	}

	// read all settings from data-attribute
	const elSettings = toJson(this.el.getAttribute(ATTR))

	// merge settings
	this.settings = extend(true, {}, DEFAULT, settings, elSettings)

	// default settings
	let config = this.settings.default

	// if settings has media queries defined
	if (this.settings.responsive) {
		// sort min width settings
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
