#!/usr/bin/env bash
CLI_LOCATION="$(pwd)/cli"
echo "Building plugin in $(pwd)"
sudo $CLI_LOCATION/decky plugin build "$(pwd)"