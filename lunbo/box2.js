window.onload = function () {
	var oBox2 = document.getElementById('box2');
	var oCBox = document.getElementById('cbox');
	var oInnerBox = document.getElementById('innerBox');
	var oJprev = document.getElementById('Jprev');
	var oNext = document.getElementById('Jnext');
	var switchBlocks = [oJprev, oNext];
	var oJNav = document.getElementById('Jnav');
	var switchAs = oJNav.getElementsByTagName('a');

	function beginClick() {
		for(var i = 0; i < switchAs.length; i++) {
			(function(n) {
				switchAs[i].onclick = function () {
//					oInnerBox.style.left = (n * -520) + 'px';
					slideLeft(oInnerBox, (n * -520), 10);
					for(var j = 0; j < switchAs.length; j++) {
						switchAs[j].parentNode.className = '';
					}
					switchAs[n].parentNode.className = 'selected';
				};
			})(i);
		}
	}
	beginClick();

	function adjustNav(pos) {
		for(var j = 0; j < switchAs.length; j++) {
			switchAs[j].parentNode.className = '';
		}
		if(0 === pos || -2600 === pos) {
			switchAs[0].parentNode.className = 'selected';
		} else if(-520 === pos) {
			switchAs[1].parentNode.className = 'selected';
		} else if(-1040 === pos) {
			switchAs[2].parentNode.className = 'selected';
		} else if(-1560 === pos) {
			switchAs[3].parentNode.className = 'selected';
		} else if(-2080 === pos) {
			switchAs[4].parentNode.className = 'selected';
		}
	}

	oJprev.onclick = jumpPrev;
	function jumpPrev () {
		oJprev.onclick = null;
		setTimeout(function () {
			oJprev.onclick = jumpPrev;
		}, 600);
		var tLeft = parseInt(oInnerBox.style.left);
		if(0 === tLeft) {
			tLeft = -2600;
			oInnerBox.style.left = '-2600px';
		}
		tLeft += 520;
		if(tLeft > 0) {
			tLeft -= 2600;
		}
//		oInnerBox.style.left = tLeft + 'px';
		adjustNav(tLeft);
		slideLeft(oInnerBox, tLeft, 10);
	}

	oNext.onclick = jumpNext;
	function jumpNext () {
		oNext.onclick = null;
		setTimeout(function () {
			oNext.onclick = jumpNext;
		}, 600);
		var tLeft = parseInt(oInnerBox.style.left);
		if(-2600 === tLeft) {
			tLeft = 0;
			oInnerBox.style.left = '0';
		}
		tLeft -= 520;
		if(tLeft < -2600) {
			tLeft += 2600;
		}
//		oInnerBox.style.left = tLeft + 'px';
		adjustNav(tLeft);
		slideLeft(oInnerBox, tLeft, 10);
	}

	oBox2.onmouseover = function () {
		for(var i = 0; i < switchBlocks.length; i++) {
			switchBlocks[i].style.display = 'block';
			switchBlocks[i].onmouseover = arguments.callee;
		}
	}
	oBox2.onmouseout = function () {
		for(var i = 0; i < switchBlocks.length; i++) {
			switchBlocks[i].style.display = 'none';
			switchBlocks[i].onmouseout = arguments.callee;
		}
	}

	function slideLeft(elem, goto, speed) {
		speed = speed || 20;
		var pos = parseInt(elem.style.left);
		var aim = goto - pos;
		var step = 0;
		(function () {
			step+=30;
			elem.style.left = aim > 0 ? pos + step + 'px' : pos - step + 'px';
			if(step < Math.abs(aim)) {
				setTimeout(arguments.callee, speed);
			} else {
				elem.style.left = pos + aim + 'px';
			}
		})();
		return true;
	}

}