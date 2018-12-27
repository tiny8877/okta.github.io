#!/bin/bash

# fix for bacon to be able to function.
YARN_REGISTRY=https://registry.yarnpkg.com
OKTA_REGISTRY=${ARTIFACTORY_URL}/api/npm/npm-okta-master
echo ${ARTIFACTORY_URL}

# Yarn does not utilize the npmrc/yarnrc registry configuration
# if a lockfile is present. This results in `yarn install` problems
# for private registries. Until yarn@2.0.0 is released, this is our current
# workaround.
#
# Related issues:
#  - https://github.com/yarnpkg/yarn/issues/5892
#  - https://github.com/yarnpkg/yarn/issues/3330

# Replace yarn artifactory with Okta's
sed -i "s#${YARN_REGISTRY}#${OKTA_REGISTRY}#" yarn.lock
cat yarn.lock

# Where the generated VuePress site will be placed
GENERATED_SITE_LOCATION="../packages/docs/.vuepress/dist"

# Define these ENV vars if they aren't defined already,
# so these scripts can be run outside of CI
if [[ -z "${BUILD_FAILURE}" ]]; then
    export BUILD_FAILURE=1
fi

if [[ -z "${SUCCESS}" ]]; then
    export SUCCESS=0
fi

# Use latest version of Node
setup_service node v10.7.0

export PATH="${PATH}:$(yarn global bin)"

# Install required dependencies
yarn global add @okta/ci-update-package
yarn global add @okta/ci-pkginfo


if ! yarn install ; then
  echo "yarn install failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Revert the original change
sed -i "s#${OKTA_REGISTRY}#${YARN_REGISTRY}#" yarn.lock

