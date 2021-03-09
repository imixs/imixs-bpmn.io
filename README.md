# imixs-bpmn.io

Imixs-BPMN.io Modeler is a web based BPMN modeler based on the [bpmn.io project](https://github.com/bpmn-io/bpmn-js). 

<img src="imixs-bpmn-io.png" />


## Run the Modeler

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

	$ cd main/
	$ npm install

To start the example execute

	$ npm start

To build the example into the `public` folder execute

	$ npm run all

	
# Docker

To build the docker image run:

	$ docker build -t imixs/imixs-bpmn.io .
	
Run the image with:

	$ docker run -p 8080:8080 imixs/imixs-bpmn.io


	