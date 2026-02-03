#!/bin/bash

# set NODE_OPTIONS for node 17/18
CURRENT_NODE_VERSION=`node -v`
echo "CURRENT_NODE_VERSION: $CURRENT_NODE_VERSION"
if [[ $CURRENT_NODE_VERSION =~ v17(.*)|v18(.*) ]]
then
  echo -e "currently using node version 17+ - setting NODE_OPTIONS \n"
  unset NODE_OPTIONS
  export NODE_OPTIONS=--openssl-legacy-provider
fi

#check for existing process on port:6006
PREEXISTING_PORT_PROCESS=`lsof -i :6006`
if [[ -z $PREEXISTING_PORT_PROCESS ]]
then
  echo "port:6006 available - starting storybook"
  # If setsid is unavailable, Storybook runs in our process group; only kill its PID to avoid terminating the test runner.
  if command -v setsid >/dev/null 2>&1; then
    STORYBOOK_KILL_MODE="process_group"
    SBCONFIG_PORT=6006 STORYBOOK_PORT=6006 PORT=6006 setsid npm run storybook -- --quiet --ci &
  else
    STORYBOOK_KILL_MODE="pid"
    SBCONFIG_PORT=6006 STORYBOOK_PORT=6006 PORT=6006 npm run storybook -- --quiet --ci &
  fi
  NEW_STORYBOOK_JOB_ID=$(echo $!) #get the background job ID

  # wait for a locally served Storybook
  attempt_counter=0
  max_attempts=30
  until $(curl --output /dev/null --silent --head http://localhost:6006)
  do
    if [ ${attempt_counter} -eq ${max_attempts} ]
    then
      if [[ "$STORYBOOK_KILL_MODE" == "process_group" ]]
      then
        kill -TERM -- -"$NEW_STORYBOOK_JOB_ID" 2>/dev/null || true
      else
        kill "$NEW_STORYBOOK_JOB_ID" 2>/dev/null || true
      fi
      echo "Max attempts reached"
      exit 1
    fi
    echo "waiting for a locally served Storybook in port 6006.."
    attempt_counter=$(($attempt_counter+1))
    sleep 1
  done
  # unset NODE_OPTIONS
  unset NODE_OPTIONS
else
  echo -e "port:6006 in use - storybook already started: \n $PREEXISTING_PORT_PROCESS"
fi
