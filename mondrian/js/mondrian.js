//	var paletteNode = document.getElementById('colorPalette').childNodes;
//	getChild(paletteNode);
//
//	for(var i = 0; i < paletteNode.length; i++) {
//		paletteNode[i].onclick = function () {
//			var oStyle = this.currentStyle ? this.currentStyle : window.getComputedStyle(this, null);
//			if(oStyle.getPropertyValue) {
//				paintColor = oStyle.getPropertyValue("background-color");
//			} else {
//				paintColor = oStyle.getAttribute("backgroundColor");
//			}
//			paintColor = RGB2Hex(paintColor);
//		}
//	}

//	var node = document.getElementById('myCanvas').childNodes;
//	getChild(node);
//	for(var i = 0; i < node.length; i++) {
//		node[i].onclick = function () {
//			var ctx = this.getContext('2d');
//			ctx.fillStyle = paintColor;
//			ctx.fillRect(0, 0, this.width, this.height);
//		}
//	}
//}

//function getChild(parent) {
//	for(var i = 0; i < parent.length; i++) {
//		if(3 === parent[i].nodeType && /\s/.test(parent[i].nodeValue)) {
//			parent[i].parentNode.removeChild(parent[i]);
//		}
//	}
//}

window.onload = function () {
	var paintColor = "white";

	var oColorPalette = document.getElementById('colorPalette');
	oColorPalette.onclick = function (event) {
		var event = event || window.event;
		var target = event.srcElement ? event.srcElement : event.target;
		var oStyle = target.currentStyle ? target.currentStyle : window.getComputedStyle(event.target, null);
		if(oStyle.getPropertyValue) {
			paintColor = oStyle.getPropertyValue("background-color");
		} else {
			paintColor = oStyle.getAttribute("backgroundColor");
		}
		paintColor = RGB2Hex(paintColor);
	}

  var oCanvas = document.getElementById('myCanvas');
	oCanvas.onclick = function (event) {
		var event = event || window.event;
		var target = event.srcElement ? event.srcElement : event.target;
		var ctx = target.getContext('2d');
			ctx.fillStyle = paintColor;
			ctx.fillRect(0, 0, target.width, target.height);
	}
}

function RGB2Hex(rgbColor) {
	var regexp = /[0-9]{0,3}/g;
	var re = rgbColor.match(regexp);
	var hexColor = "#";
	for(var i = 0; i < re.length; i++) {
		if(re[i]) {
			hexColor += parseInt(re[i]).toString(16);
			if(re[i] == "0") {
				hexColor += "0";
			}
		}
	}
	return hexColor;
}