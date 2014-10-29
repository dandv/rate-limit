Package.describe({
  name: 'dandv:rate-limit',
  summary: 'Rate-limit a function by queuing up calls (instead of dropping them like throttle or debounce)',
  version: '1.0.1',
  git: 'https://github.com/dandv/rate-limit.git'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.export('rateLimit', ['client', 'server']);
  api.addFiles(['rate_limit.js'], ['client', 'server']);
});
