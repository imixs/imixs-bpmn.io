# Development

See the [Quick Introduction](https://bpmn.io/toolkit/bpmn-js/walkthrough/) to get familiar with bpmn-js.


## BPMN Objects

To access the objects of BPMN model you first need to get the BPMN root element:


	const canvas = modeler.get('canvas');
	const rootElement = canvas.getRootElement(); 

In case the process is not the root element of your process diagram, you can use the elementRegistry to get access to all processes.

	import { is } from 'bpmn-js/lib/util/ModelUtil';
	
	const elementRegistry = modeler.get('elementRegistry');
	
	console.log(
	  elementRegistry.filter(function (element) {
	    return is(element, 'bpmn:Process');
	  })
	);

You can find a detailed overview of the BPMN metamodel we use under the hood inside [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle/blob/master/resources/bpmn/json/bpmn.json).

Note that the businessObject is a mirror to the XML information for each element on the canvas.

### Reading BPMN Properties

To read BPMN properties, obtain a reference to a diagram elements business object.

	var elementRegistry = bpmnJS.get('elementRegistry');
	
	var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
	    sequenceFlow = sequenceFlowElement.businessObject;
	
	sequenceFlow.name; // 'YES'
	sequenceFlow.conditionExpression; // ModdleElement { $type: 'bpmn:FormalExpression', ... }

### Writing BPMN properties

To write a BPMN property, simply set it on the business object.
Check out the bpmn.json meta-model descriptor to learn about BPMN types, their properties and relationships.

	var moddle = bpmnJS.get('moddle');
	
	// create a BPMN element that can be serialized to XML during export
	var newCondition = moddle.create('bpmn:FormalExpression', {
	  body: '${ value > 100 }'
	});

	// write property, no undo support
	sequenceFlow.conditionExpression = newCondition;



