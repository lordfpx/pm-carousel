import {
  ATTR,
  ATTRPAGING,
  ATTRPREV,
  ATTRNEXT,
  ATTRPLAYSTOP,
  ACTIVECLASS
} from './src/constants'
import utils from './src/utils'

import init from './src/init'
import setActive from './src/setActive'
import onMatchMedia from './src/onMatchMedia'
import getMqConfig from './src/getMqConfig'

const DEFAULT = {
  default: {
    loop: true,
    group: 1,
    spaceAround: 0,
    noStartSpace: false,
    autoplay: 0
  }
}

class Plugin {
  constructor (el, settings) {
    this.el = el

    // data-attribute settings
    const elSettings = utils.returnJson(this.el.getAttribute(ATTR))

    // merged settings
    this.settings = utils.extend(true, DEFAULT, settings, elSettings)

    // carousel config
    this.config = this.settings.default

    // media query carousel config
    if (this.settings.responsive) {
      // order respinsive widths
      this.settings.responsive.sort(
        (a, b) => parseInt(a.minWidth, 10) - parseInt(b.minWidth, 10)
      )

      this.config = getMqConfig.call(this)
      this.settings.responsive.forEach((config) => {
        const mql = window.matchMedia(`(min-width: ${config.minWidth})`)
        mql.addEventListener('change', onMatchMedia.bind(this))
      })
    }

    // pseudo templates
    this.nodes = {
      paging: this.el.querySelector(`[${ATTRPAGING}]`),
      prev: this.el.querySelector(`[${ATTRPREV}]`),
      next: this.el.querySelector(`[${ATTRNEXT}]`),
      playstop: this.el.querySelector(`[${ATTRPLAYSTOP}]`)
    }

    if (this.nodes.paging) {
      this.pagingBtnString = this.nodes.paging.innerHTML
    }

    // Labels
    this.texts = {}

    if (this.nodes.playstop) {
      this.playstopString = this.nodes.playstop.innerHTML
      const playstopTexts = this.nodes.playstop
        .getAttribute(ATTRPLAYSTOP)
        .split('|')

      this.texts = {
        ...this.texts,
        play: playstopTexts[0],
        stop: playstopTexts[1]
      }
    }

    if (this.nodes.prev && this.nodes.next) {
      this.prevString = this.nodes.prev.innerHTML
      this.nextString = this.nodes.next.innerHTML
      const prevTexts = this.nodes.prev.getAttribute(ATTRPREV).split('|')
      const nextTexts = this.nodes.next.getAttribute(ATTRNEXT).split('|')

      this.texts = {
        ...this.texts,
        prev: prevTexts[0],
        prevFirst: prevTexts[1],
        next: nextTexts[0],
        nextLast: nextTexts[1]
      }
    }

    if (!this.config.disable) {
      init.call(this)
    }
  }

  reinit () {
    init.call(this)
  }

  play () {
    // "stop" status !== pause
    if (!this.nodes.playstop || this.autoplayStatus === 'stop') return

    this.pause() // clear interval
    this.autoplayStatus = 'play'
    this.nodes.playstop.classList.add('is-playing')

    const playText = this.playstopString
    this.nodes.playstop.innerHTML = playText.replace('{text}', this.texts.play)

    let newActive = this.active
    this._interval = window.setInterval(() => {
      newActive++

      // must loop even with loop: false
      if (newActive > this.slideLength - 1) {
        newActive = 0
      }

      this.changeActive(newActive)
    }, this.config.autoplay)
  }

  pause () {
    window.clearInterval(this._interval)
  }

  stop () {
    if (!this.nodes.playstop) return

    this.autoplayStatus = 'stop'
    this.nodes.playstop.classList.remove('is-playing')

    const stopText = this.playstopString
    this.nodes.playstop.innerHTML = stopText.replace('{text}', this.texts.stop)
    window.clearInterval(this._interval)
  }

  toggleAutoplay () {
    if (!this.nodes.playstop) return

    if (this.autoplayStatus === 'play') {
      this.stop()
    } else if (this.autoplayStatus === 'stop') {
      this.autoplayStatus = 'play'
      this.play()
    }
  }

  changeActive (newActive) {
    this.active = newActive

    if (this.active < 0) {
      this.active = this.config.loop ? this.slideLength - 1 : 0
    }

    if (this.active > this.slideLength - 1) {
      this.active = this.config.loop ? 0 : this.slideLength - 1
    }

    setActive.call(this)
  }

  disable () {
    this.stop()

    this.nodes.wrapper.removeEventListener('touchstart', this.onTouchStart)
    this.nodes.wrapper.removeEventListener('touchmove', this.onTouchMove)
    this.nodes.wrapper.removeEventListener('touchend', this.onTouchEnd)
    this.el.removeEventListener('click', this.onClick)
    this.el.removeEventListener('mouseenter', this.pause)
    this.el.removeEventListener('mouseleave', this.play)

    this.nodes.paging.hidden = true
    this.nodes.prev.hidden = true
    this.nodes.next.hidden = true
    this.nodes.playstop.hidden = true

    this.nodes.overflow.removeAttribute('style')
    this.nodes.wrapper.removeAttribute('style')

    this.nodes.items.forEach((nodes) => {
      nodes.forEach((node) => {
        node.removeAttribute('tabindex')
        node.removeAttribute('aria-hidden')
        node.removeAttribute('style')
      })
    })

    this.el.classList.remove(ACTIVECLASS)
  }
}

const initPmCarousel = (node, settings) => {
  if (!node.pmCarousel && node.hasAttribute(ATTR)) {
    node.pmCarousel = new Plugin(node, settings)
  }
}

const pmCarousel = function (settings = {}, node) {
  if (node === null) return

  node = node || document.querySelectorAll(`[${ATTR}]`)

  node.length
    ? node.forEach((node) => initPmCarousel(node, settings))
    : initPmCarousel(node, settings)
}

window.pmCarousel = pmCarousel

export default pmCarousel
