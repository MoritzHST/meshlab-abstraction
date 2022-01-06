# Abstraction for MeshLab

## How to run

Required:
- docker
- docker-compose

The service can be started locally using the following command in the CLI

```
docker-compose build
docker-compose up
```

## About

This project is build to abstract MeshLab due to the instability and complexity of the common installation. With this application we attemt to run MeshLab without a graphical user interface. This takes cuts off various features of MeshLab like rendering the model, so the user can see it.
Furthermore we implemented a way to administrate different executions with the respective output files.

## Technologies

### Client

For the client as web application we used the React library. React offers a simple way to change the behaviour of the graphical user interface based on different states. Additionally it is effortless to proxy request to different servers, since the React frontend communicates with a Node.js backend. This eliminates the danger of CORS-requests.

### Server

The server is build with Node.js and the Express framework. The goal of the server is to proxy and administrate different request to potential additional backends. In this implementation we do support exlusivly MeshLab as backend to process the different .ply files.
Another feature of the server is to store the different filter scripts in the `data/templates` folder. To mount an external folder which contains various filter scripts a [docker volume](https://docs.docker.com/storage/volumes/) can be used. The client can communicate with the server over a simplified REST-API. The API does not completely fulfill the REST standard.

### MeshLab

The concrete MeshLab backend is based on the usage of the library PyMeshLab. As the name suggests, it is a Python library. Therefore the service is written in Python. To be able to access the functionality the library Flask was used to build a simplified REST-API. This REST-API does also not completely fulfill the REST standard.
