module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      instances: 2,
      exec_mode: 'cluster',
      //   node_args: '--inspect-brk',
      //   env: {
      //     NODE_ENV: 'production',
      //   },
    },
  ],
};
