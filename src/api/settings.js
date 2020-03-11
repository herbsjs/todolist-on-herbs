const dotenv = require('dotenv');
dotenv.config({ silent: true });

const Settings = {
  web: {
    httpPort: process.env.HTTP_PORT || 3000
  }
};

module.exports = Settings;
