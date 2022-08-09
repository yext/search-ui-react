#!/bin/bash

npm run storybook -- --quiet --ci &
JOB_ID=$(echo $!) #get the background job ID

# wait for a locally served Storybook
attempt_counter=0
max_attempts=30
until $(curl --output /dev/null --silent --head http://localhost:6006)
do
  if [ ${attempt_counter} -eq ${max_attempts} ]
  then
    kill -9 $JOB_ID
    echo "Max attempts reached"
    exit 1
  fi

  echo 'waiting for a locally served Storybook in port 6006..'
  attempt_counter=$(($attempt_counter+1))
  sleep 1
done
