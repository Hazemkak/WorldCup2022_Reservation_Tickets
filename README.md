# World Cup 2022 Reservation System

(Book a match!)[http://worldcup.uksouth.cloudapp.azure.com/]

This is a simple reservation system for the 2022 World Cup. It is a simple web application that allows users to reserve tickets for the World Cup. It is built using the Django framework for the backend, and React.js and TypeScript for the frontend.

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Hazemkak/WorldCup2022_Reservation_Tickets.git
    ```

2. Enter the project directory

    ```bash
    cd WorldCup2022_Reservation_Tickets
    ```

3. See the [API's README](server/README.md) for instructions on how to set up the server.

4. See the [client's README](client/README.md) for instructions on how to set up the client.

## Using Docker

1. Make sure you have installed Docker and docker-compose locally

2. In the project directory run
    ```
    docker-compose up
    ```
    This will build client and server docker images and start thier containers in addition to PostgreSQL container

3. Server container will do migrations once it is up and DB container up

4. If the migrations already done before it will skip it (As DB container has a persistant volume so it will save everything)

5. Start using the App from http://localhost:80
