#!/bin/bash

#check for existing process on port:6006
process=`lsof -i :6006`
if [[ -z $process ]]
then
  echo "port:6006 available - starting storybook"
  # start Storybook in the same shell
  . ./tests/scripts/start-storybook.sh

  # generate coverage from storybook test-runner
  test-storybook --coverage

  # kill the locally served Storybook
  npx kill-port 6006

 # generate lcov coverage for visual tests from story book
  nyc report --reporter=lcov -t coverage/storybook --report-dir coverage/visual

  cp coverage/storybook/coverage-storybook.json coverage/visual/coverage-storybook.json
  rm -r coverage/storybook
else
  echo -e "port:6006 in use - please kill current process before starting storybook: \n $process"
fi