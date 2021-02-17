import _getMqConfig from "./_getMqConfig.js";

function _onMatchMedia() {
  this.config = _getMqConfig.call(this);
  this.config.disable ? this.disable() : this.refresh();
}

export default _onMatchMedia;
