# Reset script for docker
echo "Resetting docker containers"
# sudo systemctl restart docker 
# remove all containers
docker-compose stop
docker-compose rm
docker volume rm $(docker volume ls -q) -f
# build and run
docker-compose up --build -d