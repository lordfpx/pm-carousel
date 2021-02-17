import utils from "./utils.js";

function _getMqConfig() {
  let updatedMqConfig = this.settings.responsive.find(mqConfigs => window.matchMedia(mqConfigs.mq).matches);

  return updatedMqConfig ? utils.extend(this.settings.config, updatedMqConfig) : this.settings.config;
}

export default _getMqConfig;
