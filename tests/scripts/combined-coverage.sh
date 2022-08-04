#!/bin/bash

# Run unit test and visual coverage test by default.
# Skip this step if merge-only flag is provided.
echo $1
if [ "$1" != "merge-only" ]
then
  echo 'running individual tests...'
  npm run test:unit
  npm run test:visual
fi

# merge
mkdir -p coverage/merge
cp coverage/unit/coverage-final.json coverage/merge/coverage-unit.json
cp coverage/visual/coverage-storybook.json coverage/merge/coverage-storybook.json

nyc report --reporter=lcov --reporter=text -t coverage/merge --report-dir coverage/merge
cp coverage/merge/lcov.info coverage/lcov.info
