
var svgLeaf = '<svg class="leaf" xmlns="http://www.w3.org/2000/svg" width="50px" height="20px" viewBox="0 0 20.96 26.52"><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2"><path class="svg-leaf" d="M1.15.47A31,31,0,0,0,8.83,4.52a42.91,42.91,0,0,1,4.11,1.84A12.93,12.93,0,0,1,16.21,8.8,14.44,14.44,0,0,1,18.49,12,17.25,17.25,0,0,1,20,15.77a18.68,18.68,0,0,1,.6,4.44,18.39,18.39,0,0,1-.69,5.41l-.7.52a18.26,18.26,0,0,1-5.38-.88,19,19,0,0,1-4.09-1.84A17,17,0,0,1,6.55,20.9a14.62,14.62,0,0,1-2.41-3.09A13.13,13.13,0,0,1,2.72,14a44.08,44.08,0,0,1-.58-4.46A31.19,31.19,0,0,0,.45,1Z"/></g></g></svg>';


function expandTree(){
  $('.cover-text').addClass('allCSS');
  $('.tree').addClass('expand');
  setTimeout(addLeaf, 10000);
}

function addLeaf(){

  var leafColors = [ '#f7931e', '#ff0', '#ed1c24' ];
  var sidebars = [ '#left-sidebar', '#right-sidebar'];
  var leafXPosition = Math.floor(Math.random() * 100) + 20 + 'px';

  $leaf = $(svgLeaf)
    .appendTo(randomSelect(sidebars))
    .css('position', 'absolute')
    .css('fill', randomSelect(leafColors))
    .css('left', leafXPosition)
    .on('animationend', function(event){ $(event.target).remove() });

  var min = 1,
  max = 10;

  //Generate Random number between 5 - 10
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  setTimeout(addLeaf, rand * 1000);

}

function randomSelect(arr){
  return arr[Math.floor((Math.random() * arr.length))]
}

$(document).ready(function(){
  var baseTime = 10000;
  setTimeout(()=> $('#greeting').addClass('burst'), baseTime - 9000);
  setTimeout(()=> $('#greeting').addClass('fade-out'), baseTime - 8000);
  setTimeout(()=> $('#greeting').text('Dear Jane Doe:').addClass('fade-in'), baseTime - 6000);
  setTimeout(()=> $('#animation_container').removeClass('hidden'), baseTime - 6000);
  setTimeout(()=> stage.play(), baseTime - 5000); // plays the logo wink animation
  setTimeout(()=> $('.css').addClass('burst'), baseTime - 3000);
  setTimeout(()=> $('.html').addClass('burst'), baseTime - 2000);
  setTimeout(()=> $('.animation').addClass('burst'), baseTime - 1500);
  setTimeout(()=> $('.adobe').addClass('burst'), baseTime - 1250);
  setTimeout(()=> $('.javascript').addClass('burst'), baseTime - 1000);
  setTimeout(()=>$('#cover-text').removeClass('cover-text-white'), baseTime);
  setTimeout(()=>$('#cover-text').addClass('css-cover'), baseTime);
  setTimeout(()=>$('header').removeClass('hidden initial-header'), baseTime + 1000);
  setTimeout(()=>$('footer').removeClass('hidden initial-footer'), baseTime + 1500);
  setTimeout(()=>$('#left-sidebar').removeClass('hidden initial-left-sidebar'), baseTime + 2000);
  setTimeout(()=>$('#right-sidebar').removeClass('hidden initial-right-sidebar'), baseTime + 2000);
  setTimeout(()=>expandTree(), baseTime + 3000);
  setTimeout(()=>$('body').addClass('css-body'), baseTime + 2500);
  setTimeout(()=>$('.image').removeClass('hidden'), baseTime + 12000);
})

/*  code for logo animation  */
var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("05892EFBC0664F42A1B92D59B6A167EF");
	var lib=comp.getLibrary();
	handleComplete({},comp);
}
function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	exportRoot = new lib.marstudio();
	stage = new lib.Stage(canvas);
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
    stage.stop();
	}
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {
		var lastW, lastH, lastS=1;
		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();
		function resizeCanvas() {
			var w = lib.properties.width, h = lib.properties.height;
			var iw = window.innerWidth, ih=window.innerHeight;
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
			if(isResp) {
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
					sRatio = lastS;
				}
				else if(!isScale) {
					if(iw<w || ih<h)
						sRatio = Math.min(xRatio, yRatio);
				}
				else if(scaleType==1) {
					sRatio = Math.min(xRatio, yRatio);
				}
				else if(scaleType==2) {
					sRatio = Math.max(xRatio, yRatio);
				}
			}
			canvas.width = w*pRatio*sRatio;
			canvas.height = h*pRatio*sRatio;
			canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';
			canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
			stage.scaleX = pRatio*sRatio;
			stage.scaleY = pRatio*sRatio;
			lastW = iw; lastH = ih; lastS = sRatio;
			stage.tickOnUpdate = false;
			stage.update();
			stage.tickOnUpdate = true;
		}
	}
	makeResponsive(false,'both',false,1);
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}
