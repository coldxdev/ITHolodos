run:
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
stop:
	docker stop holodos_server
rmi:
	docker rmi holodos_server
i:
	docker build -t holodos_server .