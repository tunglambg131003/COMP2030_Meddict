FROM node:18-alpine 

WORKDIR /var/www/

COPY package.json /var/www/
COPY package-lock.json /var/www/

RUN npm install --force

COPY public/ /var/www/public/
COPY src/ /var/www/src/

EXPOSE 3000

CMD ["npm", "run", "start"]