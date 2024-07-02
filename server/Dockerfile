FROM node:21-alpine

# Create the working directory inside the container and apply the correct
# permissions
RUN mkdir -p /home/node/server/node_modules && chown -R node:node /home/node/server

# Set this as the working dir, so . refers to this location
WORKDIR /home/node/server

# Copy the package.json file into the container
COPY --chown=node:node package*.json ./

# Change to the non-privileged user
USER node

# Run the npm install command to get all the packages
RUN npm install

# Copy the current directory into the container, and set the correct user
COPY --chown=node:node ./ ./

# Generate the Prisma client
RUN npx prisma generate

# Expose the port on which the server is running
EXPOSE 8000

CMD [ "npm", "run", "server" ]
