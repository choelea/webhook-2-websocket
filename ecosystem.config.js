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

  
  deploy : {
    production : {
      user : 'root',
      host : '121.42.12.209',
      ref  : 'origin/master',
      repo : 'git@github.com:choelea/markdown-cms.git',
      path : '/root/apps/markdown-cms',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    prd : { // quick deploy with out npm install
      user : 'root',
      host : '121.42.12.209',
      ref  : 'origin/master',
      repo : 'git@github.com:choelea/markdown-cms.git',
      path : '/root/apps/markdown-cms',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};
