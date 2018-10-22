
## Usage

### 1. Create  a .env file

This file should be placed in the project root folder

```.env

# Postgres Database configuation. Only used during setup
PG_USERNAME=
PG_PASSWORD=
PG_DATABASE=

# Managment Secret: used to deploy service. Only used during setup and deployment
PRISMA_MANAGEMENT_API_SECRET=

# Enpoint where Prisma is deployed. Example http://localhost:4466/project/dev
PRISMA_ENDPOINT=
# Used to access the Prisma API
PRISMA_SECRET=

# Used to validate user sessions
APP_SECRET=

# See BYCRYPT docs
BCRYPT_SALT_ROUNDS=

# Location of ZKTime database file, used to load employee events
ZKTIME_DB_PATH=

```

### 2. Install dependencies

```sh
npm install
```

### 3. Deploy the Prisma database service

Docker must be installed and running

```sh
docker-compose -f database/docker-compose.yml up -d
# or
npm run docker-compose
```

### 4. Deploy the Prisma database service

The prisma CLI must be installed globally

```sh
prisma deploy
# or
npm run prisma-deploy
```

### 5. Start the server

```sh
npm run dev # start dev server & open playground
# or
npm run start # start production server
```
