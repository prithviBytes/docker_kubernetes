# Using an exisiting docker image as base
FROM alpine
# Download and install dependencies
RUN apk add --update redis
RUN apk add --update gcc
# Tell image what to do when it starts as a container
CMD [ "redis-server" ]