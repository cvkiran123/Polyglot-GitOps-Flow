# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Using npm install instead of frozen-lockfile if you're troubleshooting dependencies
RUN npm install
COPY . .
RUN NEXT_TELEMETRY_DISABLED=1 npx next build --no-lint

# Stage 2: Serve with Nginx
FROM nginx:mainline-alpine

# 1. Remove the default config to prevent conflicts
RUN rm /etc/nginx/conf.d/default.conf

# 2. Copy your build output (ensure 'output: export' is in next.config.js)
COPY --from=builder /app/out /usr/share/nginx/html

# 3. Copy your custom Nginx config to the ROOT location
COPY nginx.conf /etc/nginx/nginx.conf

# 4. Permissions Fix:
# We create the PID file in /tmp (as defined in your config) 
# and give ownership of all necessary paths to user 101.
RUN touch /tmp/nginx.pid && \
    chown -R 101:101 /tmp/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx

# 5. Run as non-root
USER 101

EXPOSE 80

# The -g "daemon off;" is vital for Docker to keep the container running
CMD ["nginx", "-g", "daemon off;"]