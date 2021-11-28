# Making Projects with Docker

```
$ docker build .
Sending build context to Docker daemon  4.096kB
Step 1/5 : FROM node:alpine                                                                                                   ctsWi 
 ---> 9e17f47b0a78
Step 2/5 : WORKDIR /usr/app
 ---> Running in bbd282a121a2
Removing intermediate container bbd282a121a2
 ---> a7833083ac85
Step 3/5 : COPY ./ ./
 ---> 9908e9534d1f        
Step 4/5 : RUN npm install
 ---> Running in 20b0e75bf7eb

added 50 packages, and audited 51 packages in 5s

found 0 vulnerabilities
npm notice 
npm notice New patch version of npm available! 8.1.2 -> 8.1.4
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v8.1.4>
npm notice Run `npm install -g npm@8.1.4` to update!
npm notice 
Removing intermediate container 20b0e75bf7eb
 ---> 877572759192
Step 5/5 : CMD ["npm", "start"]
 ---> Running in 2b545a9fbad2
Removing intermediate container 2b545a9fbad2
 ---> 1eb4f2330cf5
Successfully built 1eb4f2330cf5
```

### Tagging

```
$ docker build -t prithvi107/simplewebapp .
Sending build context to Docker daemon  4.096kB
Step 1/5 : FROM node:alpine
 ---> 9e17f47b0a78
Step 2/5 : WORKDIR /usr/app
 ---> Using cache
 ---> a7833083ac85
Step 3/5 : COPY ./ ./
 ---> Using cache
 ---> 9908e9534d1f
Step 4/5 : RUN npm install
 ---> Using cache
 ---> 877572759192
Step 5/5 : CMD ["npm", "start"]
 ---> Using cache
 ---> 1eb4f2330cf5
Successfully built 1eb4f2330cf5
Successfully tagged prithvi107/simplewebapp:latest
```

### Running the container

This wont be exposed to our local host since we havent binded the PORT to localhost yet.

```
baymax@W10C8JP8Y2:/mnt/c/Users/Prithviraj_K_suvarna/OneDrive - Dell Technologies/Desktop/Codes/DockerAndKubernetes/MakingProjectsWithDocker/simpleweb$ docker run prithvi107/simplewebapp

> start        
> node index.js

Listening on post 8080
```
### Container PORT mapping

PORT mapping is stictly a one time thing and is only done while executing the run command to the container.

Command
```
docker run -p <host_port>:<container_port> <image_id>
```

```
$ docker run -p 8080:8080 prithvi107/simplewebapp

> start        
> node index.js

Listening on post 8080
```
### Specifying working Directory

Any instructions following this instruction will be executed relative to this directory.
```
WORKDIR /usr/app
```
