#!/bin/bash

# run unit test and visual coverage test
npm run test:unit
npm run test:visual

# merge
rm -rf coverage/merge
mkdir -p coverage/merge
cp coverage/unit/lcov.info coverage/merge/lcov-unit.info
cp coverage/visual/lcov.info coverage/merge/lcov-visual.info

lcov-result-merger 'coverage/merge/lcov-*.info' 'coverage/merge/lcov-all.info'

cp coverage/merge/lcov-all.info coverage/lcov.info
