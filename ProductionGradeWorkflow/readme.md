# Development Workflow

Project Link: <a href="https://github.com/prithviBytes/react-cicd">React CICD Project</a>

### Build Image with Dockerfile with different naming convention.

```
docker build -f <filename> .
```

### Docker Volume

Containers can access the files and Folders of the HOST System using Volumes.

Here we specify the reference to the local storage by using a -v flag and a colon.
But we donot want the container to look for the node modules in the local system as we want the
container itself to install it, hence we donot want to share the node modules.
To aviod this what we do id bookmark the node_modules dir and for rest of the files map the pwd i.e the Present working Direcotry to the /app folder.

```
docker run -v /app/node_modules -v $(pwd):/app <image_id>
```

Example: 

```
 docker run -p 3001:3000 -it -v /home/node/app/node_modules -v $(pwd):/home/node/app prithvi107/react-cicd
```