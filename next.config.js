const withPlugins = require("next-compose-plugins");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const config = {
    webpack5: true,
    env: {
        ENDPOINT: process.env.ENDPOINT,
    }
};

module.exports = withPlugins([], config);
