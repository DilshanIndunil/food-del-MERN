# admin dockerfile

# use offial node image
FROM node:20-alpine

#set working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json ./

#copy source code
COPY . .

#install dependencies
RUN npm install

# expose port
EXPOSE 5174

#run the app
CMD ["npm", "run", "dev"]