# Author: Fabiano Henrique
# Date: 2024/09/10

# Utilizar a imagem oficial do NodeJS como base do build
FROM node:20.12.0 AS builder


# Definir o diretório de trabalho
WORKDIR /src

# Usar as mudanças do package.json para forçar o Docker invalidar o cache
# quando houver mudanças nas dependências
COPY back/package.json /src

# Resolver as dependencias do projeto
RUN set -eux; \
      apt update; \
      npm install;

#  Copiar o fonte do projeto para a imagem de build
COPY back/ /src

EXPOSE 4000

CMD ["npm", "start"]