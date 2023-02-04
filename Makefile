c:
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
rmc:
	docker stop holodos_server
i:
	docker build -t holodos_server .
rmi:
	docker rmi holodos_server
upd:
	docker stop holodos_server
	docker rmi holodos_server
	docker build -t holodos_server .
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
run:
	docker build -t holodos_server .
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
stop:
	docker stop holodos_server
	docker rmi holodos_server
