FROM node:8-alpine

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install --only=production
# RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./src ./src

EXPOSE 4000
CMD [ "node", "index.js" ]