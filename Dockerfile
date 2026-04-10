# base image 
FROM node:20

# setup environment variable  
ENV APPHOME=/home/app

# set work directory  
RUN mkdir -p $APPHOME  

# where your code lives  
WORKDIR $APPHOME

# copy whole project to your docker home directory. 
COPY . $APPHOME

# run this command to install all dependencies
# Increased timeout to reduce transient network failures during image build.
RUN yarn install --network-timeout 600000

# port where the Django app runs  
EXPOSE 80

# start server  
#CMD python webapp/manage.py migrate && cd webapp/ && gunicorn webapp.wsgi --log-file -
CMD yarn run build && yarn run start