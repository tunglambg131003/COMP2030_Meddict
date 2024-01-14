FROM node:18-alpine 

ADD package.json /var/www/package.json
ADD package-lock.json /var/www/package-lock.json

RUN cd /var/www/ && npm install --force

WORKDIR /var/www/
COPY public/ /var/www/public/
COPY src/ /var/www/src/

EXPOSE 3000

CMD ["npm", "run", "start"]