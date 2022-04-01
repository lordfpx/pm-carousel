function prevBtn() {
  if (!this.nodes.prev) return

  const prevText = this.prevString
  this.nodes.prev.innerHTML = prevText.replace(
    "{text}",
    this.active === 0 ? this.texts.prevFirst : this.texts.prev
  )

  this.config.loop
    ? (this.nodes.prev.hidden = false)
    : (this.nodes.prev.hidden = this.active === 0)
}

export default prevBtn
