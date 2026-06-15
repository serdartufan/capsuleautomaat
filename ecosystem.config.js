require('dotenv').config({ path: '/home/serdar/.secrets/api-keys.env' });

module.exports = {
  apps: [{
    name: 'capsuleautomaat',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/capsuleautomaat',
    env: {
      PORT: 3005,
      NODE_ENV: 'production',
      WOOCOMMERCE_URL: process.env.WOOCOMMERCE_URL,
      WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
      WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    }
  }]
};
