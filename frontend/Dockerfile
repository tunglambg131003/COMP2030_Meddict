FROM node:18-alpine 

WORKDIR /var/www/

COPY public/ /var/www/public/
COPY src/ /var/www/src/
COPY package.json /var/www/
COPY package-lock.json /var/www/

EXPOSE 3000

RUN npm install --force
CMD ["npm", "run", "start"]