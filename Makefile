create_image_server:
	docker build -f server.Dockerfile -t holodos_server .
run_container_server:
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
stop_container_server:
	docker stop holodos_server
remove_image_server:
	docker rmi holodos_server

upd_server:
	docker stop holodos_server
	docker rmi holodos_server
	docker build -f server.Dockerfile -t holodos_server .
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
run_server:
	docker build -f server.Dockerfile -t holodos_server .
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server
stop_server:
	docker stop holodos_server
	docker rmi holodos_server


create_image_client:
	docker build -f client.Dockerfile -t holodos_client .
run_container_client:
	docker run -d -p 8002:3000 --rm --name holodos_client holodos_client
stop_container_client:
	docker stop holodos_client
remove_image_client:
	docker rmi holodos_client

upd_client:
	docker stop holodos_client
	docker rmi holodos_client
	docker build -f client.Dockerfile -t holodos_client .
	docker run -d -p 8002:3000 --rm --name holodos_client holodos_client
run_client:
	docker build -f client.Dockerfile -t holodos_client .
	docker run -d -p 8002:3000 --rm --name holodos_client holodos_client
stop_client:
	docker stop holodos_client
	docker rmi holodos_client

run_app:
	docker build -f client.Dockerfile -t holodos_client .
	docker run -d -p 8002:3000 --rm --name holodos_client holodos_client
	docker build -f server.Dockerfile -t holodos_server .
	docker run -d -p 8001:4000 --rm --name holodos_server holodos_server

stop_app:
	docker stop holodos_server
	docker rmi holodos_server
	docker stop holodos_client
	docker rmi holodos_client
