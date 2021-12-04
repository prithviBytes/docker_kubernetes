### Building a custom Image using Dockerfile

```
$ docker build .
Sending build context to Docker daemon   2.56kB
Step 1/3 : FROM alpine
latest: Pulling from library/alpine
59bf1c3509f3: Pull complete                                                                                             Digest: sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300
Status: Downloaded newer image for alpine:latest
 ---> c059bfaa849c
Step 2/3 : RUN apk add --update redis
 ---> Running in 9e375b706f00
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/x86_64/APKINDEX.tar.gz
(1/1) Installing redis (6.2.6-r0)
Executing redis-6.2.6-r0.pre-install
Executing redis-6.2.6-r0.post-install
Executing busybox-1.34.1-r3.trigger
OK: 8 MiB in 15 packages
Removing intermediate container 9e375b706f00
 ---> 4f1f45fabb60
Step 3/3 : CMD [ "redis-server" ]
 ---> Running in c1e777f82a44
Removing intermediate container c1e777f82a44
 ---> 42dccf24940a
Successfully built 42dccf24940a

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them



$ docker run 42dccf24940a
1:C 28 Nov 2021 07:24:57.771 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 28 Nov 2021 07:24:57.771 # Redis version=6.2.6, bits=64, commit=b39e1241, modified=0, pid=1, just started
1:C 28 Nov 2021 07:24:57.771 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 28 Nov 2021 07:24:57.771 * monotonic clock: POSIX clock_gettime
1:M 28 Nov 2021 07:24:57.772 * Running mode=standalone, port=6379.
1:M 28 Nov 2021 07:24:57.772 # Server initialized
1:M 28 Nov 2021 07:24:57.772 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 28 Nov 2021 07:24:57.772 * Ready to accept connections
```

### Rebuilds with cache.

If we have built an Image and then change something in the Dockerfile then docker picks the pervious image from the cache and executes any addional commands given to it thereby saving time.

Example adding RUN command to the Dockerfile which has already been built.
```
ingCustomDockerImages/BuildingRedisImage$ docker build .
Sending build context to Docker daemon   5.12kB
Step 1/4 : FROM alpine
 ---> c059bfaa849c
Step 2/4 : RUN apk add --update redis
 ---> **Using cache**
 ---> 4f1f45fabb60
Step 3/4 : RUN apk add --update gcc
 ---> Running in d8507894c82c
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/x86_64/APKINDEX.tar.gz
(1/11) Installing libgcc (10.3.1_git20211027-r0)
(2/11) Installing libstdc++ (10.3.1_git20211027-r0)
(3/11) Installing binutils (2.37-r3)
(4/11) Installing libgomp (10.3.1_git20211027-r0)
(5/11) Installing libatomic (10.3.1_git20211027-r0)
(6/11) Installing libgphobos (10.3.1_git20211027-r0)
(7/11) Installing gmp (6.2.1-r0)
(8/11) Installing isl22 (0.22-r0)
(9/11) Installing mpfr4 (4.1.0-r0)
(10/11) Installing mpc1 (1.2.1-r0)
(11/11) Installing gcc (10.3.1_git20211027-r0)
Executing busybox-1.34.1-r3.trigger
OK: 118 MiB in 26 packages
Removing intermediate container d8507894c82c
 ---> 0b5fb6871159
Step 4/4 : CMD [ "redis-server" ]
 ---> Running in 4200988bedb7
Removing intermediate container 4200988bedb7
 ---> 8f4b0759b91c
Successfully built 8f4b0759b91c
```

### No Changes

Builds the entire image with cache
```
ingCustomDockerImages/BuildingRedisImage$ docker build .
Sending build context to Docker daemon  6.656kB
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

```

### Order of operation Change

If the order of operations has been changed in the dockerfile then It will rebuild the Image from where it has been changed.