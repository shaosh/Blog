<!--Drag the selected div to other position-->
var divAndMouseX = 0;
var divAndMouseY = 0;
var divMove = 0;
var initDivX = 0;
var initDivY = 0;
var zmark = 0;
function down(status,ev){		
	if(ev.clientX <= 1280 && ev.clientX >= 0 && ev.clientY <= 3000 && ev.clientY >= 0){
	alert(status.style.left);
		divMove = status;
		divAndMouseX = ev.clientX - parseInt(divMove.style.left);
		divAndMouseY = ev.clientY - parseInt(divMove.style.top);
		initDivX = divMove.style.left;
		initDivY = divMove.style.top;
		zmark++;
		divMove.style.zIndex = zmark;		
	}
}
function move(ev){			
	if(divMove != 0){
		ev = ev;				
		var mousePos = mouseCoords(ev);	
		if(mousePos.x <= 1280 && mousePos.x >= 0 && mousePos.y <= 3000 && mousePos.y >= 0){
			divMove.style.left = mousePos.x - divAndMouseX + "px";
			divMove.style.top = mousePos.y - divAndMouseY + "px";
		}
		else{
			divMove.style.left = initDivX + "px";
			divMove.style.top = initDivY + "px";
		}
	}
	else
		return false;
}
function up(){
	if(divMove != 0)
		divMove = 0;
}
function mouseCoords(ev){			
	return {x:ev.clientX + document.documentElement.scrollLeft,y:ev.clientY + document.documentElement.scrollTop}
}

<!--Get IP, ZIP and Weather data-->
var ip;
function setip(ipstr){
	ip = ipstr;
}
var zip;
function setzip(zipstr){
	zip = zipstr;
}
function getWeather(){
	jQuery(document).ready(function($) {
		$.ajax({
			url: "http://api.aerisapi.com/observations/" + zip + "?client_id=sS77u9StKRiA7dO3A8T2y&client_secret=GIebqi23SRmaDOSHyN74loHvSMjk4ahIefKzNnd2",
			dataType: "jsonp",
			success: function(json) {
				if (json.success == true) {
				   var ob = json.response.ob;
				   document.getElementById('weather').innerText = ob.weather + ",";
				   document.getElementById('temp').innerText = ob.tempF + '°„F';	
				   var iconpath = "WxIcons/" + ob.icon;
				   var image = new Image;
				   document.getElementById('icon').appendChild(image);
				   image.src = iconpath;
				}
				else {
				   alert('An error occurred: ' + json.error.description);
				}
			}
		});
	});
}