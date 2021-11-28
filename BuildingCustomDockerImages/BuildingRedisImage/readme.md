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