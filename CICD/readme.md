### Setting Environment Variable inside a container

```
docker run -e <vairble_name>=<value> <image_id>
```

Example:

```
$ docker run -it -e username=PRITHVI alpine

/ # printenv
HOSTNAME=8fcfd1040fe6
SHLVL=1
username=PRITHVI
HOME=/root
TERM=xterm
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PWD=/
/ #
```