# Project's REST API Installation Guide

Follow the instructions below to run the project's server.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Installation](#installation)

## Prerequisites

Make sure you have the following installed:

- [Python](https://www.python.org/downloads/)
- [Pip](https://pip.pypa.io/en/stable/installing/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Database Setup

- Open PostgreSQL in your terminal

    For Windows:

    ```bash
    psql -U postgres
    ```

    For Linux:

    ```bash
    sudo -u postgres psql
    ```

- Create a database named `world_cup_2022`

    ```sql
    CREATE DATABASE world_cup_2022;
    ```

- Create a user (Optional if you want to add a custom user dedicated to the project)

    ```sql
    CREATE USER YOUR_USERNAME WITH ENCRYPTED PASSWORD 'YOUR_PASSWORD';
    ```

- Grant privileges to the user (Optional if you want to add a custom user dedicated to the project)

    ```sql
    GRANT ALL PRIVILEGES ON DATABASE World_Cup_2022 TO YOUR_USERNAME;
    ```

## Installation

1. Make sure that you have cloned the project to your local machine, and that you are in the project's server directory.

2. Create a virtual environment

    ```bash
    python -m venv ./venv
    ```

3. Activate the virtual environment

    For Windows:

    ```bash
    .\venv\Scripts\activate
    ```

    For Linux:

    ```bash
    source ./venv/bin/activate
    ```

4. Install the project's dependencies

    ```bash
    pip install -r requirements.txt
    ```

5. Copy the `.env.example` file to `.env` and fill in the required environment variables

    ```bash
    cp .env.example .env
    ```

6. Run the migrations

    ```bash
    python manage.py migrate
    ```

7. Create a superuser

    ```bash
    python manage.py createsuperuser
    ```

8. Run the server

    ```bash
    python manage.py runserver
    ```

9. To deactivate the virtual environment, run the following command

    ```bash
    deactivate
    ```
