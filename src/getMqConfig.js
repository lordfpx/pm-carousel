import utils from "./utils";

function getMqConfig() {
  let updatedMqConfig = this.settings.responsive
    .slice()
    .reverse()
    .find(
      mqConfigs => window.matchMedia(`(min-width: ${mqConfigs.width})`).matches
    );

  return updatedMqConfig
    ? utils.extend(this.settings.config, updatedMqConfig)
    : this.settings.config;
}

export default getMqConfig;
