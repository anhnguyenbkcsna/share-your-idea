FROM python:3.9

ENV DockerHOME=/home/code/share-your-idea  

RUN mkdir -p $DockerHOME 
WORKDIR $DockerHOME  


# Copy the Django project code into the container
COPY . $DockerHOME 
RUN pip install -r ./requirements.txt

# Installing dependencies
RUN pip install gunicorn

# Expose the port that the Django app will run on
EXPOSE 8000
# Run the Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Project.wsgi:application"]



# old 
# FROM python:3.9
# ENV PYTHONUNBUFFERED=1
# WORKDIR /backend

# RUN pip install pipenv
# COPY Pipfile* /backend/
# RUN pipenv requirements > requirements.txt
# RUN pip install -r requirements.txt
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# COPY . /backend/