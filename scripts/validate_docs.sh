#!/bin/bash

# This script verifies that the docs are up to date with the source code.
# The script should be run after new docs are built.
# If there are any git diffs after new docs are generated, the docs are out of date.

git diff --exit-code docs > /dev/null # send stdout to /dev/null to reduce clutter in the CI output

diff_exit_code=$?

if test $diff_exit_code -eq 1
then
  echo "Documentation is out of date. Run 'npm run build' and commit the updated docs."
  exit 1
else
  echo "Documenation is up to date"
fi