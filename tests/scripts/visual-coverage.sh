#!/bin/bash

# start Storybook in the same shell
. ./tests/scripts/start-storybook.sh

echo "PID of visual-coverage script: $$"

# generate coverage from storybook test-runner
test-storybook --coverage

# kill the locally served Storybook started by the test
if [[ -z $PREEXISTING_PORT_PROCESS ]]
then
  echo "start-storybook: start of: pgrep -lP $NEW_STORYBOOK_JOB_ID "
  pgrep -lP $NEW_STORYBOOK_JOB_ID
  echo "start-storybook: end of: pgrep -lP $NEW_STORYBOOK_JOB_ID "
  echo "visual-coverage: pkill -P $NEW_STORYBOOK_JOB_ID"
  pkill -P $NEW_STORYBOOK_JOB_ID
fi

echo "visual-coverage: generate lcov"
# generate lcov coverage for visual tests from story book
nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/visual

cp coverage/storybook/coverage-storybook.json coverage/visual/coverage-storybook.json
rm -r coverage/storybook
echo "visual-coverage: done"