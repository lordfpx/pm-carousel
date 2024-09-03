function updateNavBtns() {
	const updateBtn = (type, condition) => {
		const node = this.nodes[type]
		if (!node) return

		const template = this._templates[type]

		node.innerHTML = template.tpl.replace(
			"{text}",
			condition ? template.lastLabel : template.label
		)

		this.currentSettings.loop
			? (node.hidden = false)
			: (node.hidden = condition)
	}

	const isFirstPage = this.activePage === 0
	const isLastPage = this.activePage === this.pagesLength - 1

	updateBtn("prev", isFirstPage)
	updateBtn("next", isLastPage)
}

export default updateNavBtns
