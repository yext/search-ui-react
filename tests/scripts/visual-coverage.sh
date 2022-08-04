#!/bin/bash

# start Storybook in the same shell
. ./start-storybook.sh

# generate coverage from storybook test-runner
test-storybook --coverage

# kill the locally served Storybook
kill -9 $JOB_ID

# generate lcov coverage for visual tests from story book
nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/visual

cp coverage/storybook/coverage-storybook.json coverage/visual/coverage-storybook.json
rm -r coverage/storybook
