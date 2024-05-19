# 
FROM python:3.10-alpine

# Install system dependencies
RUN apk update && \
    apk add --no-cache \
    build-base \
    hdf5-dev

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY . /code

# Make port 80 available to the world outside this container
EXPOSE 8000

# Run uvicorn server with --reload
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]