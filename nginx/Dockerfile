FROM nginx

WORKDIR /nginx

RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

CMD bash -c "nginx -g 'daemon off;'"