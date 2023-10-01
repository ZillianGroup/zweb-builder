# -------------------
# build runner images
FROM nginx:stable-alpine as runner
RUN ls -alh /etc/nginx/

RUN apk add --no-cache \
    bash \
    sed 


## copy frontend
COPY nginx.conf /etc/nginx/nginx.conf
COPY zweb-builder-frontend.conf /etc/nginx/conf.d/zweb-builder-frontend.conf
COPY ./apps/builder/dist/index.html /opt/zweb/zweb-builder-frontend/index.html
COPY ./apps/builder/dist/assets /opt/zweb/zweb-builder-frontend/assets
RUN rm /etc/nginx/conf.d/default.conf

# test nginx
RUN nginx -t



RUN ls -alh /opt/zweb/zweb-builder-frontend/

## add main scripts
COPY zweb-builder-frontend-main.sh /opt/zweb/
COPY zweb-builder-frontend-config-init.sh /opt/zweb/
RUN chmod +x /opt/zweb/zweb-builder-frontend-main.sh 
RUN chmod +x /opt/zweb/zweb-builder-frontend-config-init.sh

# HEALTHCHECK --interval=5s --timeout=3s CMD curl -fs http://127.0.0.1:80/status?src=docker_health_check -H"Host:localhost" || exit 1

# run
EXPOSE 80
CMD ["/opt/zweb/zweb-builder-frontend-main.sh"]
