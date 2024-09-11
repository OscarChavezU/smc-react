# Etapa 1: Construcción de la aplicación
FROM node:18 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Expon el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]