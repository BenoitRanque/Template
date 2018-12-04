
## Usage

### 1. Create  a .env file

This file should be placed in the project root folder

```.env

# Example .env file

# Database configurations
PG_USERNAME=          # username cannot be "postgres" in development
PG_PASSWORD=
PG_DATABASE=
# PG_HOST=            # optional. use host.docker.internal to refer to host machine, else use postgres service name
# PG_PORT=            # optional. The port for our postgres database

# Prisma Configurations
PRISMA_MANAGEMENT_API_SECRET=         # optional. used for administrative prisma tasks (deployement, migrations)
PRISMA_ENDPOINT=                      # example: http://localhost:4466/project/dev
PRISMA_SECRET=                        # Used to access the Prisma API

# Application Configurations
APP_SECRET=ApplicationSecret          # Used to validate user sessions
BCRYPT_SALT_ROUNDS=12                 # See BYCRYPT docs
ZKTIME_DB_PATH=data/ZKTimeNet.db      # Location of ZKTime database file, used to load employee events

```
### 2. Deploy the Prisma database service

Docker must be installed and running

```sh
# development
docker-compose up -d
# production
docker-compose -f docker-compose.yml up -d
```

### 3. Deploy the Prisma datamodel to the prisma service

The prisma CLI must be installed globally

```sh
prisma deploy
```

##### 3.1 Server utils

```sh
prisma reset            # remove all server data
prisma delete           # delete service
prisma seed             # seed starting data
prisma generate         # generate schema and client based on datamodel
```