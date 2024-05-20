# 
FROM python:3.9-bullseye

# Install system dependencies
# RUN apk update && \
#     apk add --no-cache \
#     build-base \
#     hdf5-dev

# 
WORKDIR /code/src

# 
COPY ./requirements_1.txt /code/requirements_1.txt

# 
RUN pip install --no-cache-dir --upgrade -r ../requirements_1.txt

# 
COPY . /code

# Make port 80 available to the world outside this container
EXPOSE 8000

# Run uvicorn server with --reload
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]