prod-build:
	docker build -f Dockerfile.production.front-consumer --tag dwichs-front-consumer .
prod-rm:
	docker service rm dwichs_front-consumer
prod-deploy:
	docker stack deploy -c docker-compose.production.yml dwichs
prod-ls:
	docker ps

