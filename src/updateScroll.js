function updateScroll () {
  this._slideWidth = this.activeSlides[0].offsetWidth * this.config.group
  this._distance = this.active * this._slideWidth

  // dernière slide
  if (this.active === this.slideLength - 1) {
    this._distance = this.nodes.overflow.scrollWidth - this._slideWidth

    if (this.config.spaceAround) {
      this._distance -= parseInt(
        window
          .getComputedStyle(this.nodes.overflow)
          .getPropertyValue('padding-right'),
        10
      )
    }
  }

  this.nodes.overflow.style.transform = `translateX(${-this._distance}px`
}

export default updateScroll
