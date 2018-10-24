const path = require('path');
const markdownLint = require('./markdown-lint');
const markdownLinkCheck = require('./markdown-link-check');

markdownLint(path.resolve(__dirname, '../_source'));

const options = {
  // Use our dist output as the URL path  for relative links
  baseUrl: path.join(process.cwd(), 'dist'),
  ignorePatterns: [
    { pattern: '^http://localhost:' },
    { pattern: '^https://system-admin.'},
    { pattern: '.*.example.*.com'},
    // Avoid 429s on known repos
    { pattern: '^https://github.com/okta/okta-auth-js'},
    { pattern: '^https://github.com/okta/okta-signin-widget'}
  ]
};

markdownLinkCheck(options);
