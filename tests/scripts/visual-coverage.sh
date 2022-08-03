#generate coverage from storybook test runner
start-storybook -p 6006 --ci &
echo $! #get the background job ID
sleep 10
test-storybook --coverage

#todo: kill the start-storybook command

#generate lcov coverage
cp coverage/storybook/coverage-storybook.json coverage/coverage-storybook.json
nyc report --reporter=lcov -t coverage --report-dir coverage/visual
