#!/bin/bash

# To load data in database into json file `python manage.py dumpdata > seed_data.json`

# Seeding teams
python manage.py loaddata seeds/teams.json
python manage.py loaddata seeds/referees.json
python manage.py loaddata seeds/stadiums.json
