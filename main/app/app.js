import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import diagramXML from '../resources/new_process.bpmn';

var container = $('#js-drop-zone');
var toggleState = false;

var modeler = new BpmnModeler({
  container: '#bpmn-canvas'
});

function togglemenu() {
	if (!toggleState) {
		$('.nav-sidebar label').hide();
		$('.nav-sidebar').css('width', '60px');
		$('.content').css('padding-left', '60px');
		$('.content').css('margin-left', '60px');
	} else {
		$('.content').css('padding-left', '200px');
		$('.content').css('margin-left', '200px');
		$('.nav-sidebar').css('width', '200px');
		$('.nav-sidebar label').show();
	}
	toggleState = !toggleState;
}


function createNewDiagram() {
  openDiagram(diagramXML);
}

function openDiagram(xml) {

  modeler.importXML(xml, function(err) {
    if (err) {
      container
        .removeClass('with-diagram')
        .addClass('with-error');

      container.find('.error pre').text(err.message);

      console.error(err);
    } else {
      container
        .removeClass('with-error')
        .addClass('with-diagram');
    }
  });
}


function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var xml = e.target.result;
      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

$(function() {

  $('#js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    createNewDiagram();
  });
  
  
  
  
  
  $('#js-togglemenue').click(function(e) {
	  e.stopPropagation();
	  e.preventDefault();
	  togglemenu();
  });
  
  
  
  
  
  // ############ imixs-org ###################################
  $('#js-save-diagram').click(function(e) {
	  e.stopPropagation();
	  var link=$(this);
	  
	  modeler.saveXML({ format: true }, function(err, xml) {
	   	  if (err) {
            return console.error('could not save BPMN 2.0 diagram', err);
          }
	    // see: https://stackoverflow.com/questions/2226192/generate-some-xml-in-javascript-prompt-user-to-save-it
	    var name="diagram.bpmn";
	    $(link).addClass('active').attr({
	        'href': 'data:application/xml;charset=UTF-8,' + encodeURIComponent(xml),
	        'download': name
	      });
		    
        });
	  
  });
  
  
  $('#js-export-diagram').click(function(e) {
	  e.stopPropagation();
	  var link=$(this);
	  
	  modeler.saveSVG({ format: true }, function(err, svg) {
	    // see: https://stackoverflow.com/questions/2226192/generate-some-xml-in-javascript-prompt-user-to-save-it
	    var name="diagram.svg";
	    $(link).addClass('active').attr({
	        'href': 'data:application/xml;charset=UTF-8,' + encodeURIComponent(svg),
	        'download': name
	      });
		    
        });
	  
  });
  
  // ######################################################
  
  
  

  
  // Hook into Life-Cycle Events
  modeler.on('commandStack.changed', exportArtifacts);
  
  modeler.on('element.changed', function(event) {
	  var element = event.element;

	  // the element was changed by the user
  });
  
});

