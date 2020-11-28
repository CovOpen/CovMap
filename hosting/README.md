## Setup

# Preparation

Get a `Ubuntu 20.04.1 LTS` Server (e.g. 2 cores 4 GB RAM)

1. [Install Docker](https://docs.docker.com/engine/install/ubuntu/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. Clone this repo

# First Startup

1. `chmod +x setup.sh`
2. `sudo ./setup.sh`
3. Copy app files to `./data/html`
4. `docker-compose up`

# Every other

`docker-compose up`

References:

- https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71
