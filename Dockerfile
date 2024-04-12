
FROM node:20 as base 
WORKDIR /app
COPY package.json .


FROM base as dev

RUN npm install
COPY . .
ENV myENV=dev
EXPOSE 8888
CMD [ "npm","run","start-dev" ]

FROM base as prod

RUN npm install --only=production
COPY . .
ENV myENV=prod
EXPOSE 8887
CMD [ "npm","run","start" ]

