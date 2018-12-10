
## Usage

### 1. Create  .env files

These files should be placed in the project root folder

```.env

# Example .env file

# Database configurations
PG_USERNAME=wasp
PG_PASSWORD=wasp
PG_DATABASE=wasp
# optional. use host.docker.internal to refer to host machine, else use postgres service name
# PG_HOST=
# optional. The port for our postgres database
# PG_PORT=

# Prisma Configurations
# optional. used for administrative prisma tasks (deployement, migrations)
PRISMA_MANAGEMENT_API_SECRET=PrimaManagmentSecret
# example: http://localhost:4466/project/dev
PRISMA_ENDPOINT=http://localhost:4466/wasp/dev
# Used to access the Prisma API
PRISMA_SECRET=PrismaSecret

# Application Configurations
# Used to validate user sessions
APP_SECRET=ApplicationSecret
# See BYCRYPT docs
BCRYPT_SALT_ROUNDS=12
# Location of ZKTime database file, used to load employee events
ZKTIME_DB_PATH=dev_events_data/ZKTimeNet.db

```

```
# Example production .env file. Used to deploy and manage production environment.

# Variables values here must be the same as the ones in the production environment
# example: http://host:4466/project/prod
PRISMA_ENDPOINT=http://wasp:4466/wasp/prod
# Used to access the Prisma API
PRISMA_SECRET=PrismaSecret

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