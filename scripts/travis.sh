#!/bin/bash
set -e

source "${0%/*}/helpers.sh"

if [[ $TRAVIS_EVENT_TYPE != 'push' ]]; then
  export CHROME_HEADLESS=true
fi

# Run the npm install to pull in test dependencies
fold npm_install npm install

# Build site and Run tests
fold npm_test npm test

# Run Lint checker
fold npm_lint npm run post-build-lint
