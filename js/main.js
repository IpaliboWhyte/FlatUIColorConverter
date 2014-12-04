var plateDisplayed = false;
var isTesting = true;
var mode = 'Swift';

var colors = {
	'red' : ['D31900', 'F3210C', 'CE0A31', 'FA023C', 'D2505A', '990100', 'CC2649', 'E02130'],
	'green' : ['A8DBA8', '3B8686', 'CBE86B', '3FB8AF', 'BEF202', '519548', 'B3CC57', '379F7A'],
	'blue' : ['69D2E7', '00DFFC', '1BB0CE', '26ADE4', '008C9E', '00B4FF', '046D8B', '4F8699'],
	'black' : ['2A363B', '413D3D', '333333', '1A1C27', '262525', '2B2823', '373A44', '040004'],
	'yellow' : ['ECBE13', 'F4DD51', 'FACA66', 'FFFF00', 'FFC52C', 'F4F328', 'F9D423', 'F7F972'],
}

$(document).ready(function(){

	//set path
	ZeroClipboard.setMoviePath('ZeroClipboard.swf');
	//create client
	var clip = new ZeroClipboard.Client();
	//event
	clip.addEventListener('mousedown',function() {
		clip.setText(document.getElementById('covertedField').value);
	});
	clip.addEventListener('complete',function(client,text) {
		alert('copied: ' + text);
	});
	//glue it to the button
	clip.glue('copy');

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
			case 'blue':
				fillColorPlates(colors.blue);
				break;
			case 'black':
				fillColorPlates(colors.black);
				break;
			case 'yellow':
				fillColorPlates(colors.yellow);
				break;
		}
		
	});

	$('.colorCircleContainer').children().click(function(){
		$('.hexin').val($(this).attr('color'));

		convertTo($(this).attr('color'));

		$(this).addClass('animated bounceIn');

		$('.rightSide').addClass('animated pulse');

		$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated bounceIn');
		});
	});

});

function fillColorPlates(colors){
	$('.colorCircleContainer').children().each(function(index){
		$(this).attr('color', colors[index]);

		var t = $(this);

		setTimeout(function(){t.css('background-color', '#'+colors[index])},(index+1) * 100);});
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
			$('textarea').val('UIColor(red: '+(Math.round( red/255 * 1000 ) / 1000)+', green: '+(Math.round( green/255 * 1000 ) / 1000)+', blue: '+(Math.round( blue/255 * 1000 ) / 1000)+', alpha: 1)');
			break;
		case 'Objective-C':
			$('textarea').val('[UIColor colorWithRed:'+(Math.round( red/255 * 1000 ) / 1000)+' green:'+(Math.round( green/255 * 1000 ) / 1000)+' blue:'+(Math.round( blue/255 * 1000 ) / 1000)+' alpha:1]');
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

		$( "body" ).animate({
		opacity: 1,
		}, 800, function(){

			$('.colorCircleContainer').css('visibility', 'visible');

			var bounce = new Bounce();
			bounce.translate({
				from: { x: 0, y: 2000 },
				to: { x: 0, y: 0 },
				bounces: 3,
				duration: 800,
				stiffness: 4
			});

			bounce.applyTo($(".colorCircleContainer")).then(function() { 
				$('.logo').css('visibility', 'visible');
				$('.logo').addClass('animated bounceInLeft');
			});
		});

}

function disable(button){
	//$(button).prop('disabled', true);
	//$(button).css('opacity', 0.5);
}

function activate(button){
	//$(button).attr("disabled", false);
	//$(button).css('opacity', 1);
}

function switchLanguage(language){
	mode = language;
}

function closeColorPlate(){
	plateDisplayed = false;

	
	$('#colorPlate').animate({
    display: 'none',
	height: "toggle"
	}, 200, function() {
	   
	});

	var bounce = new Bounce();
	bounce.rotate({
	  from: 180,
	  to: 360,
	  bounces: 6,
	  duration: 800,
      stiffness: 4
	});

	bounce.applyTo($(".closeicon")).then(function() { 
	console.log("Animation Complete"); 
	});
}

function openColorPlate(){
	plateDisplayed = true;

	$('#colorPlate').animate({
    height: "toggle"
	}, 200, function() {

	});

	var bounce = new Bounce();
	bounce.rotate({
	  from: 0,
	  to: 180,
	  bounces: 6,
	  duration: 800,
      stiffness: 4
	});

	bounce.applyTo($(".closeicon")).then(function() { 
	console.log("Animation Complete"); 
	});

}