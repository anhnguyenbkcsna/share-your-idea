# base image  
FROM python:3.9
# setup environment variable  
ENV DockerHOME=/home/app/share-your-idea  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# install dependencies  
RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . $DockerHOME  
# run this command to install all dependencies  
RUN pip install -r requirements.txt  
# port where the Django app runs  
EXPOSE 8000  
# start server  
CMD python manage.py runserver  


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