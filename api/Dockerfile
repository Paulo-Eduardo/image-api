FROM node:11 as common
WORKDIR /api
COPY package.json ./
RUN npm install
COPY . .

### STAGE 2: Dev ###
FROM node:11 as dev
COPY --from=common /api /api
WORKDIR /api
CMD ["npm", "run", "dev"]

### STAGE 2: Deploy ###
FROM node:11 as deploy
COPY --from=common /api /api
WORKDIR /api
CMD ["npm", "start"]
