function nextBtn() {
	if (!this.nodes.next) return

	this.nodes.next.innerHTML = this._templates.next.tpl.replace(
		"{text}",
		this.activePage === this.pagesLength - 1
			? this._templates.next.lastLabel
			: this._templates.next.label
	)

	this.currentSettings.loop
		? (this.nodes.next.hidden = false)
		: (this.nodes.next.hidden = this.activePage === this.pagesLength - 1)
}

export default nextBtn
