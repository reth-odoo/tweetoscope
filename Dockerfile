FROM node:17.3

RUN mkdir -p /TWEETOSCOPE

WORKDIR /TWEETOSCOPE

COPY . .

RUN cd ./client && npm ci && npm run-script build && cd ..

RUN cd ./server && npm ci && cd ..

RUN mkdir -p /TWEETOSCOPE/server/build

RUN cp -r ./client/build/* ./server/build/

WORKDIR /TWEETOSCOPE/server

RUN npm run prebuild

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start:prod"]