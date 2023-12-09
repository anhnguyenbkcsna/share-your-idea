FROM python:3.10

ENV DockerHOME=/home/code/share-your-idea  

RUN mkdir -p $DockerHOME 
WORKDIR $DockerHOME  


# Copy the Django project code into the container
COPY . $DockerHOME 
RUN pip install -r ./requirements.txt

# Install gunicorn
RUN pip install gunicorn

# collect static files
RUN python manage.py collectstatic


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