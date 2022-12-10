FROM python:3.10.4 as base

FROM base as production

WORKDIR /code

COPY requirements.txt .

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