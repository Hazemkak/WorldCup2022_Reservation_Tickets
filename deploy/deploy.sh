#!/bin/bash

echo "[>] Starting deployment"

echo "  [+] Remove containers, volume and networks older than 1 week..."
docker system prune --force --filter "until=168h"

cd deploy

echo "  [+] Pull latest docker images..."
docker pull ahmedihab/worldcup-client:latest
docker pull ahmedihab/worldcup-server:latest

echo "  [+] Start (or Restart) containers: docker-compose up -d"
docker-compose up -d

echo "[>] Deployment finished"