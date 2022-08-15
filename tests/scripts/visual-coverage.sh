#!/bin/bash

# set NODE_OPTIONS for node 17/18
if [[ $CURRENT_NODE_VERSION =~ 17(.*)|18(.*) ]]
then
  echo -e "currently using node version 17+ - setting NODE_OPTIONS \n"
  export NODE_OPTIONS=--openssl-legacy-provider
fi

# start Storybook in the same shell
. ./tests/scripts/start-storybook.sh

# generate coverage from storybook test-runner
test-storybook --coverage

# kill the locally served Storybook started by the test
if [[ -z $PREEXISTING_PORT_PROCESS ]]
then
  pkill -P $NEW_STORYBOOK_JOB_ID
fi
# generate lcov coverage for visual tests from story book
nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/visual

cp coverage/storybook/coverage-storybook.json coverage/visual/coverage-storybook.json
rm -r coverage/storybook

# unset NODE_OPTIONS
unset NODE_OPTIONS