function onKeydown(ev) {
	let prevDef = false

	switch (ev.key) {
		case "ArrowUp":
		case "ArrowLeft":
			prevDef = true
			this.changeActive(this.activePage - 1)
			break
		case "ArrowDown":
		case "ArrowRight":
			prevDef = true
			this.changeActive(this.activePage + 1)
			break
		case "Home":
			prevDef = true
			this.changeActive(0)
			break
		case "End":
			prevDef = true
			this.changeActive(this.pagesLength - 1)
			break
	}

	prevDef && ev.preventDefault()
}

export default onKeydown
