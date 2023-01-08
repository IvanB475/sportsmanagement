from node:18

ENV PORT=3000

RUN mkdir -p /sportsmanagement/src/app

WORKDIR /sportsmanagement/src/app

COPY package*.json ./

RUN ["npm", "install"]


COPY . .

RUN ["npm", "run", "build"]

EXPOSE 3000

CMD ["npm", "run", "start"]