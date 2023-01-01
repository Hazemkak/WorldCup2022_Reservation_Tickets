#!/bin/sh

set -e
# Wait for database is up
echo "Waiting for postgres..."
# do a while loop to check if postgres is up
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Run migrations
echo "Running Migrations"
python manage.py makemigrations
python manage.py migrate
echo "Migrations Done"

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000

exec "$@"
