### docker image

A filesystem snapshot that is containerized and then also has a starup command which runs after
the container has been created.

### docker run

Creates a container of a image and runs it
```
docker run <image_name>
```

Overriding the run command
```
~$ docker run busybox
~$ docker run busybox echo Hello world
Hello world
~$ docker run busybox ls
bin
dev
etc
home
proc
root
sys
tmp
usr
var
```

### docker ps

Lists the currently running containers

```
~$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

List all the containers ever executed
```
~$ docker ps --all
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS                      PORTS     NAMES
028b49b89a0c   busybox       "ls"                     6 minutes ago    Exited (0) 6 minutes ago              great_stonebraker
d918799af82b   busybox       "echo Hello world"       7 minutes ago    Exited (0) 7 minutes ago              pensive_bell
c3bbfc58d165   busybox       "sh"                     7 minutes ago    Exited (0) 7 minutes ago              bold_goodall
5296177a9f85   busybox       "sh"                     7 minutes ago    Exited (0) 7 minutes ago              infallible_lovelace
d4562565d7e9   hello-world   "echo 'Custom messag…"   8 minutes ago    Created                               reverent_euclid
fa726e5eda73   hello-world   "/hello"                 33 minutes ago   Exited (0) 33 minutes ago             elastic_wing
```

### container lifecycle

docker run = docker create + docker start

-- -a imples attach to the container and then start it.
```
~$ docker create hello-world
f388258cfed0df63d219d3e71e29f615b36b0a31fa9d6a5aa5b1f92cc997cabf
~$ docker start -a f388258cfed0df63d219d3e71e29f615b36b0a31fa9d6a5aa5b1f92cc997cabf

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

### Restarting a container

If we override the start command of a container and then restart it with another start command that doesnt work. Initially provided start command then becomes the default command of the container.
```
~$ docker run busybox echo "Hey there"
Hey there
~$ docker ps -all
CONTAINER ID   IMAGE     COMMAND              CREATED         STATUS                     PORTS     NAMES
79bd0bf4e9bd   busybox   "echo 'Hey there'"   9 seconds ago   Exited (0) 8 seconds ago             keen_wescoff
~$ docker start -a 79bd0bf4e9bd echo "hey there again"
you cannot start and attach multiple containers at once
~$ docker start -a 79bd0bf4e9bd
Hey there
```
### Removing stopped containers.

```
~$ docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
79bd0bf4e9bd66397e4e3fa80291cf11192df5b12bcac31695016c352c9fa50c
f388258cfed0df63d219d3e71e29f615b36b0a31fa9d6a5aa5b1f92cc997cabf
028b49b89a0c97c00b1beac7cd1bfe980e233f8f52777dc4a8a690497a4b453f
d918799af82baac912a92ad6eeb7d5de2d3a68dcfec3af1d9c8c047d686b450c
c3bbfc58d1652132922cccdcef6a9e2335d667e21c0490fe1f6a0e3fb1b06e6c
5296177a9f8507a3883b8332fb9ecb8999ea8dd906c861bf3601ace3ffdc2845
d4562565d7e9d8a14a5c55a928bd8d9cca071e162cf61a0e702082c30410c07d
fa726e5eda7335390a7608767579acbf01fc3e64baa18ad25ad7e5444ccb2bd4

Total reclaimed space: 0B
~$ docker ps --all
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```
### Check container logs

```
~$ docker create busybox echo hi there
3dbcfcc62c300f46db953507e8cf967470ecfa99baa212cfcb37c4850719fbc8
~$ docker start 3dbcfcc62c300f46db953507e8cf967470ecfa99baa212cfcb37c4850719fbc8
3dbcfcc62c300f46db953507e8cf967470ecfa99baa212cfcb37c4850719fbc8
~$ docker logs 3dbcfcc62c300f46db953507e8cf967470ecfa99baa212cfcb37c4850719fbc8
hi there
```

### Stopping containers

```
~$ docker create busybox ping www.google.com
31090ee9656f42d858da889deb3db243421df9f22d046cd79cb618d31967571f
~$ docker start 31090ee9656f42d858da889deb3db243421df9f22d046cd79cb618d31967571f
31090ee9656f42d858da889deb3db243421df9f22d046cd79cb618d31967571f
~$ docker logs 31090ee9656f42d858da889deb3db243421df9f22d046cd79cb618d31967571f
PING www.google.com (142.250.114.105): 56 data bytes
64 bytes from 142.250.114.105: seq=0 ttl=37 time=260.436 ms
64 bytes from 142.250.114.105: seq=1 ttl=37 time=257.661 ms
64 bytes from 142.250.114.105: seq=2 ttl=37 time=258.378 ms
64 bytes from 142.250.114.105: seq=3 ttl=37 time=257.578 ms
64 bytes from 142.250.114.105: seq=4 ttl=37 time=258.383 ms
64 bytes from 142.250.114.105: seq=5 ttl=37 time=259.983 ms
64 bytes from 142.250.114.105: seq=6 ttl=37 time=259.922 ms
64 bytes from 142.250.114.105: seq=7 ttl=37 time=258.393 ms
64 bytes from 142.250.114.105: seq=8 ttl=37 time=261.091 ms
64 bytes from 142.250.114.105: seq=9 ttl=37 time=258.207 ms
64 bytes from 142.250.114.105: seq=10 ttl=37 time=261.914 ms
64 bytes from 142.250.114.105: seq=11 ttl=37 time=257.851 ms
64 bytes from 142.250.114.105: seq=12 ttl=37 time=259.134 ms
64 bytes from 142.250.114.105: seq=13 ttl=37 time=259.747 ms
~$ docker ps
CONTAINER ID   IMAGE     COMMAND                 CREATED          STATUS          PORTS     NAMES
31090ee9656f   busybox   "ping www.google.com"   28 seconds ago   Up 19 seconds             objective_feistel
```

Two ways to stop the above process:
1) docker stop - graceful, sends a SIGTERM signal (Stop will automatically send a SIGKILL after 10 secs)
2) docker kill - sends a SIGKILL signal

```
~$ docker stop 31090ee9656f
31090ee9656f
~$ docker kill 4df9c4e297bb
4df9c4e297bb
```

### Executing commands inside a running container

Following command runs a command inside a running container
```
docker exec -it <container_id> <command>
```

Example:
```
docker run redis
1:C 28 Nov 2021 06:32:24.560 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 28 Nov 2021 06:32:24.560 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 28 Nov 2021 06:32:24.560 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 28 Nov 2021 06:32:24.561 * monotonic clock: POSIX clock_gettime
1:M 28 Nov 2021 06:32:24.562 * Running mode=standalone, port=6379.
1:M 28 Nov 2021 06:32:24.562 # Server initialized
1:M 28 Nov 2021 06:32:24.562 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 28 Nov 2021 06:32:24.562 * Ready to accept connections

baymax@W10C8JP8Y2:~$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS      NAMES
b4bef050aa54   redis     "docker-entrypoint.s…"   29 seconds ago   Up 28 seconds   6379/tcp   compassionate_snyder
baymax@W10C8JP8Y2:~$ docker exec -it b4bef050aa54 redis-cli
127.0.0.1:6379> set muvalue 5
OK
127.0.0.1:6379> get muvalue
"5"
127.0.0.1:6379>
```
