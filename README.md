##Server Part (Python FastAPI)

> ***Requirements:***
`pip install -r server_requirements.txt`

> ***Run server:***
`uvicorn server.app:app --reload`

> ***API***
> https://spoonacular.com/


## Docker Run Server
`docker build -t myimage .`
`docker run -d --name mycontainer -p 8000:8000 myimage`