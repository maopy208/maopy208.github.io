window.onload = function () {
	var oBox1 = document.getElementById('box1');
	var oInnerBox = document.getElementById('innerBox');
	var oArrowLeft = document.getElementById('aLeft');
	var oArrowRight = document.getElementById('aRight');
	var oUls = oInnerBox.getElementsByTagName('ul');

	var i = 0;
	var auto;

	function begin() {
		change(1);
		auto = setTimeout(begin, 5000);
	}
	setTimeout(begin, 5000);

	function change(FoB) {
		if(1 === FoB) {
			fadeOut(oUls[i % oUls.length], 2);
			fadeIn(oUls[(i+1) % oUls.length], 2);
			i++;
		} else {
			fadeOut(oUls[i % oUls.length], 2);
			fadeIn(oUls[(i-1) % oUls.length], 2);
			i--;
		}
	}

	oArrowRight.onclick = function () {
		change(1);
	}
	oArrowLeft.onclick = function () {
		change(0);
	}
	oBox1.onmouseover = function () {
		clearTimeout(auto);
	}
	oBox1.onmouseout = function () {
		auto = setTimeout(begin, 5000);
	}

	function fadeIn(elem, speed, opacity) {
		speed = speed || 20;
		opacity = opacity || 100;
		elem.style.opacity = 0.5;
		var opaVal = 50;
		(function () {
			elem.style.opacity = opaVal / 100;
			opaVal += 70 / 100;
			if(opaVal <= opacity) {
				setTimeout(arguments.callee, speed);
			} else {
				elem.style.opacity = 1;
			}
		})();
		return true;
	}

	function fadeOut(elem, speed, opacity) {
		speed = speed || 20;
		opacity = opacity || 0;
		elem.style.opacity = 0.5;
		var opaVal = 50;
		(function () {
			elem.style.opacity = opaVal / 100;
			opaVal -= 70 / 100;
			if(opaVal >= opacity) {
				setTimeout(arguments.callee, speed);
			} else {
				elem.style.opacity = 0;
			}
		})();
		return true;
	}

}
