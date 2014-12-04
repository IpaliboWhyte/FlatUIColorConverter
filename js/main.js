var plateDisplayed = false;
var isTesting = true;
var mode = 'Swift';

var colors = {
	'red' : ['D31900', 'F3210C', 'CE0A31', 'FA023C', 'D2505A', '990100', 'B90504', 'E02130'],
	'green' : ['A8DBA8', '3B8686', 'CBE86B', '3FB8AF', 'BEF202', '519548', 'B3CC57', '379F7A'],
}

$(document).ready(function(){
	intialize();

	$('.controlContainer ul li').click(function(){
		$('.controlContainer ul li').removeClass();
		$('.controlContainer ul li').removeClass('defaultBackground').css("background-color", "");
		$(this).addClass('selected defaultBackground animated bounceIn');
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
		switch(colorType){
			case 'red':
				fillColorPlates(colors.red);
				break;
			case 'green':
				fillColorPlates(colors.green);
				break;
		}
		
	});

	$('.colorCircleContainer').children().click(function(){
		$('.hexin').val($(this).attr('color'));
		convertTo($(this).attr('color'));
		$('.rightSide').addClass('animated flash');
		$('.rightSide').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('.rightSide').removeClass('animated flash');
		});
	});

});

function fillColorPlates(colors){
	$('.colorCircleContainer').children().each(function(index){
		$(this).attr('color', colors[index]);
		$(this).css('background-color', '#'+colors[index]);
	});
}

function validate(hex){
	hex = hex.toLowerCase();

	if(hex.length == 6 && hex.match(/^[0-9a-z]+$/)){
		return true
	}
	return false;
}

function convertTo(hex){

	if(validate(hex)){

	var red_val = hex.slice(0, 2);
	var green_val = hex.slice(2, 4);
	var blue_val = hex.slice(4, 6);

	red_val = parseInt(red_val, 16);
	green_val = parseInt(green_val, 16);
	blue_val = parseInt(blue_val, 16);

	console.log(red_val+ ',' +green_val+ ',' +blue_val);

	handleResult(red_val, green_val, blue_val);

	$('.defaultBackground').css('background-color', '#'+hex);
	$('.defaultColor').css('color', '#'+hex);
	}
	
}

function handleResult(red, green, blue){
	// round to 1 dp
	switch(mode){
		case 'Swift':
			$('textarea').val('UIColor(red: '+(Math.round( red/255 * 1000 ) / 1000)+', green: '+(Math.round( green/255 * 1000 ) / 1000)+', blue: '+(Math.round( blue/255 * 1000 ) / 1000)+', alpha: 1.0)');
			break;
		case 'Objective-C':
			$('textarea').val('[UIColor colorWithRed:'+(Math.round( red/255 * 1000 ) / 1000)+' green:'+(Math.round( green/255 * 1000 ) / 1000)+' blue:'+(Math.round( blue/255 * 1000 ) / 1000)+' alpha:1.0]');
			break;
		case 'Rgb':
			$('textarea').val('rgb('+red+','+green+','+blue+')');
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
