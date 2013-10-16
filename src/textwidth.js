(function (root, factory) {
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else {
		// Browser globals (root is window)
		root.textwidth = factory();
	}
}(this, function () {

	var D = document;
	var W = window;
	var B = D.body;
	var sandboxes = {};
	var styles = {};
	var css = (function(){
		if ('getComputedStyle' in W) {
			return W.getComputedStyle;
		} else if ('currentStyle' in B) {
			return function (element) {
				return element.currentStyle;
			};
		}	
	})();

	function get (style, string) {

		var chars = string.split('');
		var width = 0;

		// check for definition
		if (!(style in styles)) {
			console.warn('textwidth.get passed an undefined style "' + style + '"');
			return;
		}

		// check for string length
		if (!chars[0]) {
			console.warn('textwidth.get given empty string!');
			return;
		}

		// get widths
		for (var n = string.length; n--;) {
			width += getCharWidth(style, chars[n]);
		}

		return width;

	}

	/**
	 * Gets single character widths, lazy caching along the way
	 * @param  {String} style
	 * @param  {String} character
	 * @return {Number}
	 */
	function getCharWidth (style, character) {

		return styles[style][character] || computeCharWidth(style, character);

	}

	function computeCharWidth (style, character) {

		var sandbox = sandboxes[style];
		sandbox.innerHTML = character;

		var width = sandbox.offsetWidth;
		styles[style][character] = width;

		return width;

	}

	function defineStyle (style, element) {

		var data = css(element);
		var font = data.font;

		createSandbox(style, font);

	}

	function createSandbox (style, font) {

		// add to style definition map
		styles[style] = {
			font: font
		};

		// insert into DOM
		var el = D.createElement('span');
		var s = el.style;

		s.font = font;
		s.position = 'absolute';
		s.left = '-100000px';

		B.appendChild(el);

		sandboxes[style] = el;

	}

	return {
		get: get,
		define: defineStyle	
	};

}));