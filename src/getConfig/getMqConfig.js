function getMqConfig() {
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

export default getMqConfig
