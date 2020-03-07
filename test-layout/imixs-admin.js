// Imixs-BPMN API
// V 1.0

			

		
// INIT 
$(document).ready(function() {	
		
	
});

	

	
	var toggleState = false;
	togglemenu = function() {
		if (!toggleState) {
	
			$('.nav-sidebar label').hide();
			$('.content').css('margin-left', '60px');
			$('.nav-sidebar').css('width', '60px');
	
		} else {
			$('.content').css('margin-left', '200px');
			$('.nav-sidebar').css('width', '200px');
			$('.nav-sidebar label').show();
		}
	
		toggleState = !toggleState;
	
	};
	
	
	formatDate = function() {
	    var d = new Date(),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear(),
	        hour='' +d.getHours(),
	        minute='' +d.getMinutes(),
	        second='' +d.getSeconds();
	    
	    	

	    if (month.length < 2) 
	        month = '0' + month;
	    if (day.length < 2) 
	        day = '0' + day;

	    if (hour.length < 2) 
	    	hour = '0' + hour;
	    if (minute.length < 2) 
	    	minute = '0' + minute;
	    if (second.length < 2) 
	    	second = '0' + second;
	    
	    return [year, month, day,hour,minute,second].join('');
	}
	
	

	

	