FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 3000
CMD bash -c "sleep 20 && npm run swagger && npx prisma format && npx prisma migrate dev && npm run dev"
