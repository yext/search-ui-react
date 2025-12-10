#!/bin/bash

# start Storybook in the same shell
. ./tests/scripts/start-storybook.sh

# generate coverage from storybook test-runner
test-storybook --coverage

# kill the locally served Storybook started by the test
if [[ -z $PREEXISTING_PORT_PROCESS ]]
then
  kill -- -$NEW_STORYBOOK_JOB_ID 2>/dev/null || true
fi
# generate lcov coverage for visual tests from story book
nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/visual
cp coverage/storybook/coverage-storybook.json coverage/visual/coverage-storybook.json
rm -r coverage/storybook
