FROM python:3.10.4 as base

FROM base as production

WORKDIR /usr/src/app

COPY requirements.txt .

RUN python3.10 -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN rm requirements.txt

COPY . .

EXPOSE 8000

CMD [ "python", "manage.py", "runserver","0.0.0.0:8000" ]