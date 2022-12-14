FROM python:3.10.4-alpine3.16


# set work directory
WORKDIR /usr/src/app

COPY requirements.txt .
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN python3.10 -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN rm requirements.txt

COPY . .

EXPOSE 8000

# RUN chmod +x migrate.sh
# RUN chmod +x seed_database.sh
# RUN python manage.py makemigrations
# RUN python manage.py migrate
# RUN ./seed_database.sh

CMD [ "python", "manage.py", "runserver","0.0.0.0:8000" ]
