#!/usr/bin/env bash

/opt/zweb/zweb-builder-frontend-config-init.sh

nginx &

# loop
while true; do
    sleep 1;
done
