# Docker Compose with Multiple Local Containers

### Build DockerImage

```
$ docker build -t prithvi107/visitcounter .
Sending build context to Docker daemon  4.096kB
Step 1/6 : FROM node:alpine
 ---> 9e17f47b0a78       
Step 2/6 : WORKDIR '/app'
 ---> Running in 43fda6d5da6f
Removing intermediate container 43fda6d5da6f
 ---> 05263a741881
Step 3/6 : COPY './package.json' './'
 ---> 61df3eb35800        
Step 4/6 : RUN npm install
 ---> Running in 70bddb04d7d2

added 54 packages, and audited 55 packages in 7s

1 low severity vulnerability

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
npm notice 
npm notice New patch version of npm available! 8.1.2 -> 8.1.4
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v8.1.4>
npm notice Run `npm install -g npm@8.1.4` to update!
npm notice
Removing intermediate container 70bddb04d7d2
 ---> ec678f3057f8
Step 5/6 : COPY './' './'
 ---> 7c7b127bba8c
Step 6/6 : CMD ["npm","start"]
 ---> Running in ad8ad4973468
Removing intermediate container ad8ad4973468
 ---> 1a97e22aea9b
Successfully built 1a97e22aea9b
Successfully tagged prithvi107/visitcounter:latest
```

### Create a seperate container for Redis

```
$ docker run redis
1:C 28 Nov 2021 15:01:50.507 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 28 Nov 2021 15:01:50.508 # Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 28 Nov 2021 15:01:50.508 # Warning: no config file specified, using the default config. In order to specify a config file 
use redis-server /path/to/redis.conf
1:M 28 Nov 2021 15:01:50.509 * monotonic clock: POSIX clock_gettime
1:M 28 Nov 2021 15:01:50.511 * Running mode=standalone, port=6379.
1:M 28 Nov 2021 15:01:50.511 # Server initialized
1:M 28 Nov 2021 15:01:50.511 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To 
fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 28 Nov 2021 15:01:50.512 * Ready to accept connections
```

### Starting the VisitCounter Container

We still wouldnt be able to connect to the redis server YET!
Since these containers are totally isolated and have no connection whatsoever between them.

```
$ docker run prithvi107/visitcounter

> start        
> node index.js

App started at 8081
node:events:368
      throw er; // Unhandled 'error' event
      ^

Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1161:16)
Emitted 'error' event on RedisClient instance at:
    at RedisClient.on_error (/app/node_modules/redis/index.js:406:14)
    at Socket.<anonymous> (/app/node_modules/redis/index.js:279:14)
    at Socket.emit (node:events:390:28)
    at emitErrorNT (node:internal/streams/destroy:164:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 6379
}

Node.js v17.1.0
```

### Docker Compose

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services.

All the services defined in docker-compose file is created under the same network and hence they can communicate easily.