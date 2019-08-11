.PHONY: start stop restart shell install test production coverage

install: start
	docker-compose exec node npm install

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes

restart: stop start

shell: start
	docker-compose exec node sh

test: start
	docker-compose exec node npm test

production: start
	docker-compose exec node npm run production

coverage: start
	docker-compose exec node npm run coverage
