'use strict';

Package.describe({
  summary: 'Rate-limit a function by queing up calls (instead of dropping them like throttle or debounce)'
});

Package.on_use(function (api) {
  api.export('rateLimit', ['client', 'server']);
  api.add_files(['rate_limit.js'], ['client', 'server']);
});
