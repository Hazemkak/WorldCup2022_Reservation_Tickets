#!/bin/bash

docker-compose up -d --build
# docker-compose exec web python manage.py migrate

docker-compose exec django chmod +x seed_database.sh
docker-compose exec django python manage.py makemigrations
docker-compose exec django python manage.py migrate
docker-compose exec django python manage.py loaddata seeds/teams.json
docker-compose exec django python manage.py loaddata seeds/referees.json
docker-compose exec django python manage.py loaddata seeds/stadiums.json
