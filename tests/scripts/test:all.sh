#!/usr/bin/env bash

#clean previous coverage files
rm -rf .nyc_output & rm -rf coverage 

#run unit test coverage
jest --projects tests/jest.unit.config.js --coverage

#run visual test coverage
jest --projects tests/jest.visual.config.js --coverage

#merge unit and visual test coverages
istanbul-merge --out coverage/merged/coverage-final.json ./coverage/unit/coverage-final.json  ./coverage/visual-regression/coverage-final.json

#generate lcov file and display merged coverage
nyc report --reporter=lcov --reporter=text --temp-dir=./coverage/merged --report-dir=./coverage/merged