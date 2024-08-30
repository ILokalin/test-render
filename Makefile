build:
	make -C frontend build

start:
	make start-backend

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

install:
	npm ci && make -C frontend install