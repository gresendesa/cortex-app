# base image 
FROM node:18

# Build tooling required by legacy native dependencies (e.g., node-sass).
RUN apt-get update && apt-get install -y --no-install-recommends \
		python3 \
		make \
		g++ \
	&& rm -rf /var/lib/apt/lists/*

# setup environment variable  
ENV APPHOME=/home/app

# set work directory  
RUN mkdir -p $APPHOME  

# where your code lives  
WORKDIR $APPHOME

# Copiar apenas manifesto de dependencias primeiro para aproveitar cache do Docker.
# Quando so o codigo-fonte muda, o yarn install e pulado (~0s).
COPY package.json yarn.lock $APPHOME/

# Instalar dependencias (cacheado enquanto package.json/yarn.lock nao mudarem).
RUN yarn install --network-timeout 600000

# Copiar o restante do codigo-fonte.
COPY . $APPHOME

# Compilar o bundle de producao em build-time (nao no startup do container).
RUN yarn run build

# port where the Django app runs  
EXPOSE 80

# start server — apenas serve o bundle pre-compilado, inicia em segundos.
CMD ["node", "server.js"]