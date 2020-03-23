  
dev-dockerfile = -f docker-compose.yml -f docker-compose.dev.yml
prod-dockerfile = -f docker-compose.yml -f docker-compose.staging.yml

dev:
	docker-compose $(dev-dockerfile) up

build-prod:
	docker-compose $(prod-dockerfile) build
	$(MAKE) staging