## Stage 1: Build the app for Production
#FROM node:18-alpine AS builder
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm install --frozen-lockfile
#
#COPY . .
#RUN npm run build
#
## Stage 2: Serve with Nginx
#FROM nginx:alpine
#COPY --from=builder /app/out /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# for Development
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN NEXT_TELEMETRY_DISABLED=1 npx next build --no-lint

# Stage 2: Serve with Nginx (Production)
FROM nginx:mainline-alpine
# Security: Run Nginx as a non-root user
RUN set -x \
    && chmod -R g+w /var/cache/nginx \
    && touch /var/run/nginx.pid \
    && chmod -R g+w /var/run \
    && chmod -R g+w /var/log/nginx

# Copy build output (Next.js 'out' folder)
COPY --from=builder /app/out /usr/share/nginx/html
# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
USER 101
CMD ["nginx", "-g", "daemon off;"]