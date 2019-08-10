.PHONY: start stop restart shell install

install: start
	docker-compose exec node npm install

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes

restart: stop start

shell: start
	docker-compose exec node sh
