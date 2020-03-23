  
dev-dockerfile = -f docker-compose.yml -f docker-compose.dev.yml
prod-dockerfile = -f docker-compose.yml -f docker-compose.prod.yml

build-dev:
	docker-compose $(dev-dockerfile) build

dev:
	docker-compose $(dev-dockerfile) up

build-prod:
	docker-compose $(prod-dockerfile) build

prod:
	docker-compose $(prod-dockerfile) up