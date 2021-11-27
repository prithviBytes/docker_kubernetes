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
