# Reset script for docker
echo "Resetting docker containers"
# sudo systemctl restart docker 
# remove all containers
docker compose down
# build and run
docker compose up --build -d