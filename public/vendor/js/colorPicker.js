'use strict';
(function(window){

	var _mouseMoveAction,
		_valueType,
		_renderTimer,
		_colorInstance = {},
		animationFrame = 'AnimationFrame',
		requestAnimationFrame = 'request' + animationFrame,
		cancelAnimationFrame = 'cancel' + animationFrame,

		ColorPicker = function() {};

	window.ColorPicker = ColorPicker;
	ColorPicker.addEvent = addEvent;
	ColorPicker.removeEvent = removeEvent;
	ColorPicker.getOrigin = getOrigin;
	ColorPicker.limitValue = limitValue;
	ColorPicker.changeClass = changeClass;

	// ------------------------------------------------------ //

	ColorPicker.prototype.setColor = function(newCol, type, alpha, forceRender) {
		focusInstance(this);
		_valueType = true;
		preRenderAll(_colorInstance.setColor.apply(_colorInstance, arguments));
		if (forceRender) {
			this.startRender(true);
		}
	};

	ColorPicker.prototype.saveAsBackground = function() {
		focusInstance(this);
		return saveAsBackground(true);
	};

	ColorPicker.prototype.setCustomBackground = function(col) {
		focusInstance(this);
		return _colorInstance.setCustomBackground(col);
	};

	ColorPicker.prototype.startRender = function(oneTime) {
		focusInstance(this);
		if (oneTime) {
			_mouseMoveAction = false;
			renderAll();
			this.stopRender();
		} else {
			_mouseMoveAction = 1;
			_renderTimer = window[requestAnimationFrame](renderAll);
		}
	};

	ColorPicker.prototype.stopRender = function() {
		focusInstance(this);
		window[cancelAnimationFrame](_renderTimer);
		if (_valueType) {
			_mouseMoveAction = 1;
			stopChange(undefined, 'external');
		}
	};

	ColorPicker.prototype.setMode = function(mode) {
		focusInstance(this);
		setMode(mode);
		initSliders();
		renderAll();
	};

	ColorPicker.prototype.destroyAll = function() {
		var html = this.nodes.colorPicker,
			destroyReferences = function(nodes) {
			for (var n in nodes) {
				if (nodes[n] && nodes[n].toString() === '[object Object]' || nodes[n] instanceof Array) {
					destroyReferences(nodes[n]);
				}
				nodes[n] = null;
				delete nodes[n];
			}
		};

		this.stopRender();
		installEventListeners(this, true);
		destroyReferences(this);
		html.parentNode.removeChild(html);
		html = null;
	};

	ColorPicker.prototype.renderMemory = function(memory) {
		var memos = this.nodes.memos,
			tmp = [];

		if (typeof memory === 'string') {
			memory = memory.replace(/^'|'$/g, '').replace(/\s*/, '').split('\',\'');
		}
		for (var n = memos.length; n--; ) {
			if (memory && typeof memory[n] === 'string') {
				tmp = memory[n].replace('rgba(', '').replace(')', '').split(',');
				memory[n] = {r: tmp[0], g: tmp[1], b: tmp[2], a: tmp[3]}
			}
			memos[n].style.cssText = 'background-color: ' + (memory && memory[n] !== undefined ?
				color2string(memory[n]) + ';' + getOpacityCSS(memory[n]['a'] || 1) : 'rgb(0,0,0);');
		}
	};

	// ------------------------------------------------------ //

	function limitValue(value, min, max) {
		return (value > max ? max : value < min ? min : value);
	}

	function changeClass(elm, cln, newCln) {
		return  !elm ? false : elm.className = (newCln !== undefined ?
			elm.className.replace(new RegExp('\\s+?' + cln, 'g'), newCln ? ' ' + newCln : '') :
			elm.className + ' ' + cln);
	}

	function getOrigin(elm) {
		var box = (elm.getBoundingClientRect) ? elm.getBoundingClientRect() : {top: 0, left: 0},
			doc = elm && elm.ownerDocument,
			body = doc.body,
			win = doc.defaultView || doc.parentWindow || window,
			docElem = doc.documentElement || body.parentNode,
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft =  docElem.clientLeft || body.clientLeft || 0;

		return {
			left: box.left + (win.pageXOffset || docElem.scrollLeft) - clientLeft,
			top:  box.top  + (win.pageYOffset || docElem.scrollTop)  - clientTop
		};
	}

	function addEvent(obj, type, func) {
		addEvent.cache = addEvent.cache || {
			_get: function(obj, type, func, checkOnly) {
				var cache = addEvent.cache[type] || [];

				for (var n = cache.length; n--; ) {
					if (obj === cache[n].obj && '' + func === '' + cache[n].func) {
						func = cache[n].func;
						if (!checkOnly) {
							cache[n] = cache[n].obj = cache[n].func = null;
							cache.splice(n, 1);
						}
						return func;
					}
				}
			},
			_set: function(obj, type, func) {
				var cache = addEvent.cache[type] = addEvent.cache[type] || [];

				if (addEvent.cache._get(obj, type, func, true)) {
					return true;
				} else {
					cache.push({
						func: func,
						obj: obj
					});
				}
			}
		};

		if (!func.name && addEvent.cache._set(obj, type, func) || typeof func !== 'function') {
			return;
		}

		if (obj.addEventListener) obj.addEventListener(type, func, false);
		else obj.attachEvent('on' + type, func);
	}

	function removeEvent(obj, type, func) {
		if (typeof func !== 'function') return;
		if (!func.name) {
			func = addEvent.cache._get(obj, type, func) || func;
		}

		if (obj.removeEventListener) obj.removeEventListener(type, func, false);
		else obj.detachEvent('on' + type, func);
	}
})(window);
