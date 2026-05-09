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
RUN yarn install --network-timeout 600000

# build otimizado de producao (baked na imagem)
RUN yarn run build

# port where the app runs  
EXPOSE 80

# start server (serve o build/ via node server.js)
CMD yarn run start