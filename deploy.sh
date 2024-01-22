# sync change from product branch
git pull origin product
# down-host all current Docker containers
docker compose down 
# build and run all Docker containers
docker compose up -d --build