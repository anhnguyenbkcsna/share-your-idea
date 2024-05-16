FROM python:3.10-slim

ENV home=/code

RUN mkdir -p $home 
WORKDIR $home  

# Create and activate virtual environment
RUN python3 -m venv idea_venv
RUN . idea_venv/bin/activate

# Install dependencies
COPY requirements.txt $home 
RUN pip install -r ./requirements.txt
COPY . $home 

# collect static files
RUN python manage.py collectstatic --no-input

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