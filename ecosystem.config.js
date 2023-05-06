module.exports = {
  apps: [
    {
      script: 'dist/src/server.js',
      name: 'blockops-api-core-service',
      instances: '2',
      exec_mode: 'cluster',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
      merge_logs: true
    },
    {
      script: './dist/src/queues/processors/github.js',
      name: 'github-queue',
      exec_mode: 'fork',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z'
    }
  ]
};
