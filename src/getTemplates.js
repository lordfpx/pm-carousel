import { ATTRPREV, ATTRNEXT, ATTRPLAYSTOP } from "./constants"

function getTemplates() {
	const templates = {}

	const createTemplate = (node, attr, keys) => {
		if (node) {
			const labels = node.getAttribute(attr)?.split("|")
			if (labels && labels.length === keys.length) {
				return {
					tpl: node.innerHTML,
					...Object.fromEntries(keys.map((key, i) => [key, labels[i]])),
				}
			}
		}
		return null
	}

	if (this.nodes) {
		templates.playstop = createTemplate(this.nodes.playstop, ATTRPLAYSTOP, [
			"playLabel",
			"stopLabel",
		])
		templates.prev = createTemplate(this.nodes.prev, ATTRPREV, [
			"label",
			"lastLabel",
		])
		templates.next = createTemplate(this.nodes.next, ATTRNEXT, [
			"label",
			"lastLabel",
		])

		if (this.nodes.paging) {
			templates.pagingTpl = this.nodes.paging.innerHTML
		}
	}

	return templates
}

export default getTemplates
