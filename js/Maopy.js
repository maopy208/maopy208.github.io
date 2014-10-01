//前台调用
var Maopy = function (args) {
	return new MAOPY(args);
};

//基础库
function MAOPY(args) {
	//保存获取的节点
	this.elements = [];
	if (typeof args == 'string') {
		//css模拟
		if (args.indexOf(' ') != -1) {
			var elements = args.split(' ');			//把节点拆开分别保存到数组里
			var childElements = [];					//存放临时节点对象的数组，解决被覆盖的问题
			var node = [];								//用来存放父节点用的
			for (var i = 0; i < elements.length; i ++) {
				if (node.length == 0) node.push(document);		//如果默认没有父节点，就把document放入
				switch (elements[i].charAt(0)) {
					case '#' :
						childElements = [];				//清理掉临时节点，以便父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;		//保存父节点，因为childElements要清理，所以需要创建node数组
						break;
					case '.' :
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getClassName(elements[i].substring(1), node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default :
						childElements = [];
						for (var j = 0; j < node.length; j ++) {
							var temps = this.getTagName(elements[i], node[j]);
							for (var k = 0; k < temps.length; k ++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			//find模拟
			switch (args.charAt(0)) {
				case '#' :
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.' :
					this.elements = this.getClassName(args.substring(1));
					break;
				default :
					this.elements = this.getTagName(args);
			}
		}
	} else if (typeof args == 'object') {
		if (args != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = args;
		}
	}
}
//获取ID节点
MAOPY.prototype.getId = function (id) {
	return document.getElementById(id);
};
//获取元素节点数组
MAOPY.prototype.getTagName = function (tag, parentNode) {
	var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i ++) {
		temps.push(tags[i]);
	}
	return temps;
};
//获取CLASS节点数组
MAOPY.prototype.getClassName = function (className, parentNode) {
	var node = null;
	var temps = [];
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i ++) {
		if (all[i].className == className) {
			temps.push(all[i]);
		}
	}
	return temps;
};
//设置CSS选择器子节点
MAOPY.prototype.find = function (str) {
	var childElements = [];
	for (var i = 0; i < this.elements.length; i ++) {
		switch (str.charAt(0)) {
			case '#' :
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.' :
				var temps = this.getClassName(str.substring(1), this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
				break;
			default :
				var temps = this.getTagName(str, this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
};
//获取某一个节点，并返回DOM对象
MAOPY.prototype.get = function (num) {
	return this.elements[num];
};
//获取某一个节点，并返回Maopy对象
MAOPY.prototype.eq = function (num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};
//设置CSS
MAOPY.prototype.css = function (attr, value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(1 == arguments.length) {
			return this.getStyle(this.elements[i], attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};
//添加Class
MAOPY.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!this.hasClass(this.elements[i], className)) {
			this.elements[i].className += className + ' ';
		}
	}
	return this;
};
//移除Class
MAOPY.prototype.removeClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (this.hasClass(this.elements[i], className)) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
		}
	}
	return this;
};
//添加link或style的CSS规则
MAOPY.prototype.addRule = function (num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	this.insertRule(sheet, selectorText, cssText, position);
	return this;
};
//移除link或style的CSS规则
MAOPY.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	this.deleteRule(sheet, index);
	return this;
};
//设置innerHTML
MAOPY.prototype.html = function (str) {
	for(var i = 0; i < this.elements.length; i++) {
		if(0 == arguments.length) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};
//设置鼠标移入移出方法
MAOPY.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
};
//设置显示
MAOPY.prototype.show = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'block';
	}
	return this;
};
//设置隐藏
MAOPY.prototype.hide = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'none';
	}
	return this;
};
//插件入口
MAOPY.prototype.extend = function (name, fn) {
	MAOPY.prototype[name] = fn;
};


