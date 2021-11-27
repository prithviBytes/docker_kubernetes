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

