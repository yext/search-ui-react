#!/bin/bash

#check for existing process on port:6006
PREEXISTING_PORT_PROCESS=`lsof -i :6006`
if [[ -z $PREEXISTING_PORT_PROCESS ]]
then
  echo "port:6006 available - starting storybook"
  npm run storybook -- --quiet --ci &
  NEW_STORYBOOK_JOB_ID=$(echo $!) #get the background job ID

  # wait for a locally served Storybook
  attempt_counter=0
  max_attempts=30
  until $(curl --output /dev/null --silent --head http://localhost:6006)
  do
    if [ ${attempt_counter} -eq ${max_attempts} ]
    then
      pkill -P $NEW_STORYBOOK_JOB_ID
      echo "Max attempts reached"
      exit 1
    fi
    echo "waiting for a locally served Storybook in port 6006.."
    attempt_counter=$(($attempt_counter+1))
    sleep 1
  done
else
  echo -e "port:6006 in use - storybook already started: \n $PREEXISTING_PORT_PROCESS"
fi