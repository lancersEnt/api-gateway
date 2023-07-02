FROM node:18.16-alpine as builder

WORKDIR /usr/share/gateway-svc
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
COPY . .

FROM node:18.16-alpine
COPY --from=builder /usr/share/gateway-svc/node_modules ./node_modules/
COPY --from=builder /usr/share/gateway-svc/package*.json ./
COPY --from=builder /usr/share/gateway-svc/dist ./dist/
COPY --from=builder /usr/share/gateway-svc/tsconfig.build.json ./
COPY --from=builder /usr/share/gateway-svc/tsconfig.json ./

ENV NODE_OPTIONS=--max_old_space_size=4096

CMD ["npm", "run", "start"]