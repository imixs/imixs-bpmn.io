import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import diagramXML from '../resources/newDiagram.bpmn';

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

function saveSVG(done) {
  modeler.saveSVG(done);
}

function saveDiagram(done) {
alert('save diagram');
    modeler.saveXML({ format: true }, function(err, xml) {
    done(err, xml);
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
  
  
  
  
  
  // ############ Ralph ###################################
  $('#js-save-diagram').click(function(e) {
	  e.stopPropagation();
	  //e.preventDefault();

	  var link=$(this);
	  //alert(link.attr('id')); 
	  
	  modeler.saveXML({ format: true }, function(err, xml) {
	    // see: https://stackoverflow.com/questions/2226192/generate-some-xml-in-javascript-prompt-user-to-save-it
	    var name="test1.bpmn";
	    $(link).addClass('active').attr({
	        'href': 'data:application/xml;charset=UTF-8,' + encodeURIComponent(xml),
	        'download': name
	      });
		    
        });
	  
  });
  
  
  $('#js-export-diagram').click(function(e) {
	  e.stopPropagation();
	  //e.preventDefault();

	  var link=$(this);
	  //alert(link.attr('id')); 
	  
	  modeler.saveSVG({ format: true }, function(err, svg) {
	    // see: https://stackoverflow.com/questions/2226192/generate-some-xml-in-javascript-prompt-user-to-save-it
	    var name="test1.svg";
	    $(link).addClass('active').attr({
	        'href': 'data:application/xml;charset=UTF-8,' + encodeURIComponent(svg),
	        'download': name
	      });
		    
        });
	  
  });
  
  // ######################################################
  
  
  
  

  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

 
  $('.buttons a').click(function(e) {
	    if (!$(this).is('.active')) {
	      e.preventDefault();
	      e.stopPropagation();
	    }
	  });

  function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);
//alert("data=" + encodedData);
    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
      
      
    } else {
      link.removeClass('active');
    }
  }

  var exportArtifacts = debounce(function() {

    saveSVG(function(err, svg) {
      setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
    });

    saveDiagram(function(err, xml) {
      setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
    });
  }, 500);

  
  // Hook into Life-Cycle Events
  modeler.on('commandStack.changed', exportArtifacts);
  
  modeler.on('element.changed', function(event) {
	  var element = event.element;

	  // the element was changed by the user
  });
  
});



// helpers //////////////////////

function debounce(fn, timeout) {

  var timer;

  return function() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(fn, timeout);
  };
}