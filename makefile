.PHONY: start stop restart shell install test production coverage development publish

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

development: start
	docker-compose exec node npm run development

publish: start
	docker-compose exec node npm login
	docker-compose exec node npm publish --access public
