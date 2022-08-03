#!/bin/bash

# generate coverage from storybook test-runner
start-storybook -p 6006 --ci &
JOB_ID=$(echo $!) #get the background job ID
while ! curl http://localhost:6006 -I; do sleep 1; done
test-storybook --coverage

# kill the start-storybook command
kill -9 $JOB_ID

# generate lcov coverage for visual tests from story book
nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/visual

# clean up
cp coverage/storybook/coverage-storybook.json coverage/visual/coverage-storybook.json
rm -r coverage/storybook
