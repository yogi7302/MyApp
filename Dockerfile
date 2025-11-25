# Use nginx to serve static files
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite app
COPY dist /usr/share/nginx/html

# Expose a custom port (e.g., 3000)
EXPOSE 3000

# Override default Nginx config to listen on 3000
RUN sed -i 's/listen       80;/listen       3000;/' /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
