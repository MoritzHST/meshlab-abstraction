FROM node:10.16

RUN apt-get install

# Create app directory
WORKDIR /usr/src/app
RUN mkdir -p data/templates

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "./bin/www"]
