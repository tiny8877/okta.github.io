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

# Run markdown Lint check
fold npm_markdown_lint npm run markdown-lint

# Run /dist lint checker
fold npm_post_build_lint npm run post-build-lint
