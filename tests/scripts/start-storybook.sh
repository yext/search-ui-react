#!/bin/bash

npm run storybook -- --quiet --ci &

# wait for a locally served Storybook
attempt_counter=0
max_attempts=30
until $(curl --output /dev/null --silent --head http://localhost:6006)
do
  if [ ${attempt_counter} -eq ${max_attempts} ]
  then
    npx kill-port 6006
    echo "Max attempts reached"
    exit 1
  fi

  echo "waiting for a locally served Storybook in port 6006.."
  attempt_counter=$(($attempt_counter+1))
  sleep 1
done
