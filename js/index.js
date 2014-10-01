window.onload = function () {
	var roll2sec = document.getElementById('roll2sec');
	var oInter = document.getElementById('inter');
	var interTop = 0;

	roll2sec.onclick = function () {
		interTop = Maopy().getElementTop(oInter);
		if (document.documentElement && document.documentElement.scrollTop) {
			Maopy().slideTo(document.documentElement.scrollTop, interTop);
		} else if(document.body) {
			Maopy().slideTo(document.body.scrollTop, interTop);
		}
	}
}

Maopy().extend('slideTo', function (from, to) {
	var pos = from;
	var step = (to - from) / 100;
	(function () {
		pos += step;
		step *= 1.1;
		if (document.documentElement && document.documentElement.scrollTop) {
			document.documentElement.scrollTop = pos;
		} else if(document.body) {
			document.body.scrollTop = pos;
		}
		if(from > to ? pos >= to : pos <= to) {
			setTimeout(arguments.callee, 10);
		} else {
			if (document.documentElement && document.documentElement.scrollTop) {
				document.documentElement.scrollTop = to;
			} else if(document.body) {
				document.body.scrollTop = to;
			}
		}
	})();
});
Maopy().extend('getElementTop', function (element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
});