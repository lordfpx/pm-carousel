import { ATTR } from "./constants"

function onClick(ev) {
	const targetNode = ev.target

	// Actions mapping depending on elements
	const actions = {
		[`${ATTR}-playstop`]: () => this.toggleAutoplay(),
		[`${ATTR}-prev`]: () => this.changeActive(this.activePage - 1),
		[`${ATTR}-next`]: () => this.changeActive(this.activePage + 1),
		[`${ATTR}-paging`]: () => {
			const targetBtn = targetNode.closest(`[${ATTR}-paging] li`)
			if (targetBtn) {
				const newActive = this.nodes.pages.indexOf(targetBtn)
				this.changeActive(newActive)
			}
		},
	}

	// loop through actions
	for (const [selector, action] of Object.entries(actions)) {
		if (targetNode.closest(`[${selector}]`)) {
			// Stop autoplay if no play/stop button
			if (selector !== `${ATTR}-playstop`) {
				this.stop()
			}

			action()
			break // break loop when action found
		}
	}
}

export default onClick
