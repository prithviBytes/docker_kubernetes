# Building Custom Images using Docker ServerS

Docker File -> Docker Client -> Docker Server -> Usable Image!

- Docker file: Configs to define the container behavior.
- Docker Client: Intermediate between us and the docker server.
- Docker Server: Take the DockerFile and creates a image which can be used to start a container.

### DockerFile

- Specify a base Image
- Run commands to install additional dependencies
- Command to run the container after startup.

### Tagging an Image

Giving a name to the image

```
docker build -t <username>/<image_name>:<version> .
```
Example

```
baymax@W10C8JP8Y2:/mnt/c/Users/Prithviraj_K_suvarna/OneDrive - Dell Technologies/Desktop/Codes/DockerAndKubernetes/BuildingCustomDockerImages/BuildingRedisImage$ docker build -t prithvi107/redis:latest .
Sending build context to Docker daemon  7.168kB
Step 1/4 : FROM alpine
 ---> c059bfaa849c
Step 2/4 : RUN apk add --update redis
 ---> Using cache
 ---> 4f1f45fabb60
Step 3/4 : RUN apk add --update gcc
 ---> Using cache
 ---> 0b5fb6871159
Step 4/4 : CMD [ "redis-server" ]
 ---> Using cache
 ---> 8f4b0759b91c
Successfully built 8f4b0759b91c
Successfully tagged prithvi107/redis:latest

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
baymax@W10C8JP8Y2:/mnt/c/Users/Prithviraj_K_suvarna/OneDrive - Dell Technologies/Desktop/Codes/DockerAndKubernetes/BuildingCustomDockerImages/BuildingRedisImage$ docker run prithvi107/redis:latest
1:C 28 Nov 2021 13:04:15.390 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 28 Nov 2021 13:04:15.390 # Redis version=6.2.6, bits=64, commit=b39e1241, modified=0, pid=1, just started
1:C 28 Nov 2021 13:04:15.390 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 28 Nov 2021 13:04:15.391 * monotonic clock: POSIX clock_gettime
1:M 28 Nov 2021 13:04:15.392 * Running mode=standalone, port=6379.
1:M 28 Nov 2021 13:04:15.392 # Server initialized
1:M 28 Nov 2021 13:04:15.392 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 28 Nov 2021 13:04:15.392 * Ready to accept connections                                                      
```

### Building Images from Container

```
~$ docker run -it alpine sh
/ # apk add --update redis
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/x86_64/APKINDEX.tar.gz
(1/1) Installing redis (6.2.6-r0)
Executing redis-6.2.6-r0.pre-install
Executing redis-6.2.6-r0.post-install
Executing busybox-1.34.1-r3.trigger
OK: 8 MiB in 15 packages

~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED          STATUS          PORTS     NAMES
247713e2fba9   alpine    "sh"      55 seconds ago   Up 54 seconds             blissful_napier


~$ docker commit -c 'CMD ["redis-server"]' 247713e2fba9
sha256:18b7484515ae1da43a9884eb001a4ffac79e3e01aa102f49bef8f5618b73cd7d


~$ docker run 18b7484515ae1da43
1:C 28 Nov 2021 13:13:22.208 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 28 Nov 2021 13:13:22.208 # Redis version=6.2.6, bits=64, commit=b39e1241, modified=0, pid=1, just started
1:C 28 Nov 2021 13:13:22.208 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 28 Nov 2021 13:13:22.209 * monotonic clock: POSIX clock_gettime
1:M 28 Nov 2021 13:13:22.210 * Running mode=standalone, port=6379.
1:M 28 Nov 2021 13:13:22.210 # Server initialized
1:M 28 Nov 2021 13:13:22.210 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 28 Nov 2021 13:13:22.210 * Ready to accept connections
^C1:signal-handler (1638105203) Received SIGINT scheduling shutdown...
1:signal-handler (1638105203) You insist... exiting now.
```