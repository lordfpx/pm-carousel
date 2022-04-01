import { TRANSITION } from './constants'

function onTouchStart (ev) {
  this.nodes.overflow.style.transition = 'none'
  this._touchstartX = Math.round(ev.touches[0].pageX)
  this._slideWidth = this.nodes.wrapper.offsetWidth
}

function onTouchMove (ev) {
  this._touchmoveX = Math.round(ev.touches[0].pageX)
  this._moveX = this._touchstartX - this._touchmoveX

  this.nodes.overflow.style.transform = `translateX(${
    -this._distance - this._moveX / 2
  }px)`
}

function onTouchEnd (ev) {
  let newActive = this.active

  this.nodes.overflow.style.transition = TRANSITION

  if (this._moveX > this._slideWidth / 3) {
    newActive++
  } else if (this._moveX < -this._slideWidth / 3) {
    newActive--
  } else {
    // reset to initial position
    this.nodes.overflow.style.transform = `translateX(${-this._distance}px)`
    return
  }

  this.changeActive(newActive)
}

export default { onTouchStart, onTouchMove, onTouchEnd }
