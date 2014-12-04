var plateDisplayed = false;
var isTesting = true;
var mode = 'Swift';

$(document).ready(function(){

	intialize();

	$('.controlContainer ul li').click(function(){
		$('.controlContainer ul li').removeClass();
		$(this).addClass('selected');
		var lang_type = $(this).attr('language-type');
		$('textarea').attr('placeholder', lang_type + ' Code');
		switchLanguage(lang_type);

		if(validate($('.hexin').val())) {
			convertTo($('.hexin').val());
		}
	})

	$(".hexin").keyup(function (e) {
	    if (e.keyCode == 13) {
	    	var hex = $(this).val()
	    	convertTo(hex);
	    }
	});

	$('.closeicon').click(function(){

		if(!plateDisplayed){
			
			openColorPlate();

		}else{
			closeColorPlate();
		}
	})

	$('.selectColorPlate ul li').click(function(){
		var colorType = $(this).attr('color-type');
		$('#select-body-label').text(colorType);
		closeColorPlate();
	});

});

function validate(hex){
	if(hex.length == 6){
		return true
	}

	return false;
}

function convertTo(hex){

	if(hex.length == 6 || isTesting){

	var red_val = hex.slice(0, 2);
	var green_val = hex.slice(2, 4);
	var blue_val = hex.slice(4, 6);

	red_val = parseInt(red_val, 16);
	green_val = parseInt(blue_val, 16);
	blue_val = parseInt(green_val, 16);

	console.log(red_val+ ',' +green_val+ ',' +blue_val);

	handleResult(red_val, green_val, blue_val);
	}else{
		alert('invalid');
	}
	
}

function handleResult(red, green, blue){
	switch(mode){
		case 'Swift':
			$('textarea').text('UIColor(red: '+red+', green: '+green+', blue: '+blue+', alpha: 1.0)');
			break;
		case 'Objective-C':
			$('textarea').text('[UIColor colorWithRed:'+red+' green:'+green+'blue:'+blue+' alpha:1.0f]');
			break;
		case 'Rgb':
			$('textarea').text('rgb('+red+','+green+','+blue+')');
			break;
	}
	activate($('button#copy'));
}

function intialize(){
	switchLanguage('Swift');
	disable($('button#copy'));
}

function disable(button){
	$(button).prop('disabled', true);
	$(button).css('opacity', 0.5);
}

function activate(button){
	$(button).attr("disabled", false);
	$(button).css('opacity', 1);
}

function switchLanguage(language){
	mode = language;
}

function closeColorPlate(){
	plateDisplayed = false;
	$('#colorPlate').animate({
    display: 'block',
	height: "toggle"
	}, 200, function() {
	   
	});

	$('.closeicon').animate({  borderSpacing: 0 }, {
	    step: function(now,fx) {
	      $(this).css('transform','rotate('+now+'deg)');  
	    },
	    duration:200
	},'linear');

	$('.closeicon').removeClass('rotate');
}

function openColorPlate(){
	plateDisplayed = true;
	$('#colorPlate').animate({

    display: 'block',
    height: "toggle"
	}, 200, function() {

	});

	$('.closeicon').animate({  borderSpacing: -90 }, {
	    step: function(now,fx) {
	      $(this).css('transform','rotate('+now+'deg)');  
	    },
	    duration:200
	},'linear');

	$('.closeicon').addClass('rotate');	
}
