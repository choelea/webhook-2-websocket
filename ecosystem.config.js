module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'webhook-debugger',
      script    : 'app.js',
      instances: 0,
      env_production : {
        NODE_ENV: 'production',
        PORT: 4000 
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   * Step1 (initiate, one time step): pm2 deploy ecosystem.config.js  production setup
   * Step2:  pm2 deploy ecosystem.config.js  production
   */
  deploy : {
    production : {
      user : 'root',
      host : '121.42.12.209',
      ref  : 'origin/master',
      repo : 'git@github.com:choelea/webhook-2-websocket.git',
      path : '/root/apps/webhook-debuger',
      'post-deploy' : 'nvm use v8.17.0 && npm install && pm2 reload ecosystem.config.js --env production'
    },
    prd : { // quick deploy with out npm install
      user : 'root',
      host : '121.42.12.209',
      ref  : 'origin/master',
      repo : 'git@github.com:choelea/webhook-2-websocket.git',
      path : '/root/apps/webhook-debuger',
      'post-deploy' : 'nvm use v8.17.0 && pm2 reload ecosystem.config.js --env production'
    }
  }
};
