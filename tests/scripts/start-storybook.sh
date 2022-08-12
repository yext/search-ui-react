#!/bin/bash

#check for existing process on port:6006
process=`lsof -i :6006`
if [[ -z $process ]]
then
  echo "port:6006 available - starting storybook"
  npm run storybook -- --quiet --ci &
  JOB_ID=$(echo $!)

  # wait for a locally served Storybook
  attempt_counter=0
  max_attempts=30
  until $(curl --output /dev/null --silent --head http://localhost:6006)
  do
    if [ ${attempt_counter} -eq ${max_attempts} ]
    then
      pkill -P $JOB_ID
      echo "Max attempts reached"
      exit 1
    fi
    echo "waiting for a locally served Storybook in port 6006.."
    attempt_counter=$(($attempt_counter+1))
    sleep 1
  done
else
  echo -e "port:6006 in use - storybook already started: \n $process"
fi