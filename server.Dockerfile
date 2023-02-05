FROM python:3.9

WORKDIR /code

COPY ./server/server_requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./server /code/app

CMD ["uvicorn", "app.app:app", "--reload", "--host", "0.0.0.0", "--port", "4000"]
