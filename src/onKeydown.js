function onKeydown(event) {
	const keyActions = {
		ArrowUp: () => this.changeActive(this.activePage - 1),
		ArrowLeft: () => this.changeActive(this.activePage - 1),
		ArrowDown: () => this.changeActive(this.activePage + 1),
		ArrowRight: () => this.changeActive(this.activePage + 1),
		Home: () => this.changeActive(0),
		End: () => this.changeActive(this.pagesLength - 1),
	}

	const action = keyActions[event.key]
	if (action) {
		action()
		event.preventDefault()
	}
}

export default onKeydown
