FROM node:23
WORKDIR /app
COPY --chown=1000 package*.json .
RUN npm install

COPY --chown=1000 . .
EXPOSE 8080
CMD ["node", "app.js"]