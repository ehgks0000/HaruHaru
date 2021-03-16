module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
