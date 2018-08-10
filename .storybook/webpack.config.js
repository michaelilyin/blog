const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  const config = defaultConfig;
  config.resolve.alias['@app-core'] = path.join(__dirname, '../src/app/core');
  config.resolve.alias['@app-shared'] = path.join(__dirname, '../src/app/shared');
  config.resolve.alias['@app-components'] = path.join(__dirname, '../src/app/shared/components');
  config.resolve.alias['@app-pipes'] = path.join(__dirname, '../src/app/shared/pipes');
  config.resolve.alias['@app-auth'] = path.join(__dirname, '../src/app/admin/auth');
  config.resolve.alias['@app-admin'] = path.join(__dirname, '../src/app/admin');
  config.resolve.alias['@app-home'] = path.join(__dirname, '../src/app/home');
  config.resolve.alias['@app-skills'] = path.join(__dirname, '../src/app/skills');
  config.resolve.alias['@app-environment'] = path.join(__dirname, '../src/environments');
  config.resolve.alias['@app'] = path.join(__dirname, '../src/app');
  config.resolve.alias['sass'] = path.join(__dirname, '../src/sass');


  const tsloader = config.module.rules.find(rule => {
    return rule.use && rule.use.length && rule.use[0].loader && rule.use[0].loader.indexOf('ts-loader') !== -1
  });
  tsloader.use[0].options.configFile = path.join(__dirname, 'tsconfig.sb.json');
  return config;
};
