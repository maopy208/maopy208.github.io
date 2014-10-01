window.onload = function () {
	var langToggle = document.getElementById('langToggle');
	var langOpenToggle = 0;
	var langOptions = document.getElementById('langOptions');
	langToggle.onclick = function () {
		if(!langOpenToggle) {
			langOptions.style.display = 'block';
			langToggle.addClass('lang-toggle-open');
			langOpenToggle = 1;
		} else {
			langOptions.style.display = 'none';
			langToggle.removeClass('lang-toggle-open');
			langOpenToggle = 0;
		}
	}
	var menuToggle = document.getElementById('menuToggle');
	var menuOpenToggle = 0;
	var menuOptions = document.getElementById('menuOptions');
	menuToggle.onclick = function () {
		if(!menuOpenToggle) {
			menuOptions.style.display = 'block';
			menuToggle.addClass('menu-toggle-open');
			menuOpenToggle = 1;
		} else {
			menuOptions.style.display = 'none';
			menuToggle.removeClass('menu-toggle-open');
			menuOpenToggle = 0;
		}
	}
}

Object.prototype.addClass = function(className) {
	if(!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
		this.className += ' ' + className;
	}
}

Object.prototype.removeClass = function(className) {
	if(this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
		this.className = this.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
	}
}