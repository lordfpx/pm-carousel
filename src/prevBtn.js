function prevBtn() {
	if (!this.nodes.prev) return

	this.nodes.prev.innerHTML = this._templates.prev.tpl.replace(
		"{text}",
		this.activePage === 0
			? this._templates.prev.lastLabel
			: this._templates.prev.label
	)

	this.currentSettings.loop
		? (this.nodes.prev.hidden = false)
		: (this.nodes.prev.hidden = this.activePage === 0)
}

export default prevBtn
