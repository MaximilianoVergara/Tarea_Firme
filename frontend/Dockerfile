# Usar una imagen base con Node.js
FROM node:14-alpine

# Establecer el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package.json package-lock.json /app/

# Instalar las dependencias del proyecto
RUN npm install -g --force npm@latest
RUN npm install --production

# Copiar el resto de los archivos del proyecto
COPY . /app

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación

CMD ["npm", "start"]