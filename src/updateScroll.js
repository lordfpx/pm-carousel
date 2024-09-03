export function updateScroll() {
	this._metrics.slideWidth =
		this.visibleSlides[0].offsetWidth * this.currentSettings.group
	this._metrics.distance = this.activePage * this._metrics.slideWidth

	// last slide
	if (this.activePage === this.pagesLength - 1) {
		this._metrics.distance =
			this.nodes.overflow.scrollWidth - this._metrics.slideWidth

		if (this.currentSettings.spaceAround) {
			this._metrics.distance -= parseInt(
				window
					.getComputedStyle(this.nodes.overflow)
					.getPropertyValue("padding-right"),
				10
			)
		}
	}

	this.nodes.overflow.style.transform = `translateX(${-this._metrics
		.distance}px`
}

export default updateScroll
