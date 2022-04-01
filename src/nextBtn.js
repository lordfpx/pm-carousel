function nextBtn() {
  if (!this.nodes.next) return

  const nextText = this.nextString
  this.nodes.next.innerHTML = nextText.replace(
    "{text}",
    this.active === this.slideLength - 1 ? this.texts.nextLast : this.texts.next
  )

  this.config.loop
    ? (this.nodes.next.hidden = false)
    : (this.nodes.next.hidden = this.active === this.slideLength - 1)
}

export default nextBtn
