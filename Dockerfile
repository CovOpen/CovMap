FROM node:12-alpine

RUN apk update \
    && apk upgrade \
    && apk add curl git openssl \
    && mkdir /app/

WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install
RUN openssl req -newkey rsa:2048 -new -nodes -x509 -subj "/C=DE/ST=Denial/L=Springfield/O=Dis/CN=www.covmapper.com" -days 3650 -keyout key.pem -out cert.pem 

COPY src ./src/
COPY apps/official ./apps/official/
COPY static ./static/
COPY data ./data
COPY config ./config
COPY .babelrc webpack.config.js ./
COPY tsconfig.json ./tsconfig.json

EXPOSE 8080

CMD ["yarn", "run", "dev:ssl"]

HEALTHCHECK \
    --interval=30s \
    --timeout=5s \
    --start-period=5s\
    --retries=3 \
    CMD curl --fail --silent --show-error http://localhost:8080/
