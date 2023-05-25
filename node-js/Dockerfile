# Establecer la imagen base
FROM node:14-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json tsconfig.json /app/

# Instalar las dependencias
RUN npm ci

# Copiar el código fuente
COPY src /app/src

# Compilar el código TypeScript
RUN npm run clean
RUN npm run tsc

# Exponer el puerto de la aplicación
EXPOSE 3001

# Establecer el comando de inicio
CMD [ "npm", "run", "dev" ]