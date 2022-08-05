#!/bin/bash

npm run test:unit
npm run test:visual

# merge
mkdir -p coverage/merge
cp coverage/unit/coverage-final.json coverage/merge/coverage-unit.json
cp coverage/visual/coverage-storybook.json coverage/merge/coverage-storybook.json

nyc report --reporter=lcov --reporter=text -t coverage/merge --report-dir coverage/merge
cp coverage/merge/lcov.info coverage/lcov.info
