'use strict';
var hsvPicker = function(defaultColor, presetColors, callback) {
  var ColorPicker = window.ColorPicker,
		Tools = ColorPicker || window.Tools,
		startPoint,
		currentTarget,
		currentTargetHeight = 0;

  /* ---------------------------------- */
  /* ------- Render color patch ------- */
  /* ---------------------------------- */
  var testPatch = document.getElementById('testPatch'),
    renderTestPatch = function(color) {
      var RGB = color.RND.rgb;
      testPatch.style.cssText =
        'background-color: rgba(' + RGB.r + ',' + RGB.g + ',' + RGB.b + ',' + color.alpha + ');' +
        'color: ' + (color.rgbaMixBlack.luminance > 0.22 ? '#222' : '#fff');
      testPatch.firstChild.data = '#' + color.HEX;
    };

	/* ---------------------------------- */
	/* ---------- Color squares --------- */
	/* ---------------------------------- */
  var colorSquares = document.getElementById('color_squares'),
  squares = colorSquares.children,
  n = squares.length;

  if (!presetColors) {
    for ( ; n--; ) {
      // draw random color values as background
      squares[n].style.backgroundColor = 'rgb(' +
      Math.round(Math.random() * 255) + ',' +
      Math.round(Math.random() * 255) + ',' +
      Math.round(Math.random() * 255) +')';
    }
  } else {
    function hexToLightness(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      var lightness = (parseInt(result[1], 16) * 0.299 + parseInt(result[2], 16) * 0.587 + parseInt(result[3], 16) * 0.114) / 3;
      return Math.round(lightness);
    }

    for (let i = 0; i < n && i < presetColors.length; i++) {
      squares[i].style.backgroundColor = presetColors[i].colorCode;
      squares[i].innerText = presetColors[i].colorName;
      if (hexToLightness(presetColors[i].colorCode) > 43) {
        squares[i].classList.add('dark-text');
      }
    }
  }

  // event delegation
	Tools.addEvent(colorSquares, 'click', function(e) {
		var target = e.target || e.srcElement;
		if (target.parentNode === this) {
      myColor.setColor(target.style.backgroundColor);
      // console.log(myColor.colors.HEX);
      callback(myColor.colors);
			startRender(true);
		}
	});


	/* ---------------------------------- */
	/* ---- HSV-circle color picker ----- */
	/* ---------------------------------- */
	var hsv_map = document.getElementById('hsv_map'),
		hsv_mapCover = hsv_map.children[1], // well...
		hsv_mapCursor = hsv_map.children[2],
		hsv_barBGLayer = hsv_map.children[3],
		hsv_barWhiteLayer = hsv_map.children[4],
		hsv_barCursors = hsv_map.children[6],
		hsv_barCursorsCln = hsv_barCursors.className,
		hsv_Leftcursor = hsv_barCursors.children[0],
		hsv_Rightcursor = hsv_barCursors.children[1],

		colorDisc = document.getElementById('surface'),
		colorDiscRadius = colorDisc.offsetHeight / 2,
		luminanceBar = document.getElementById('luminanceBar'),

		hsvDown = function(e) { // mouseDown callback
			var target = e.target || e.srcElement;

			if (e.preventDefault) e.preventDefault();

			currentTarget = target.id ? target : target.parentNode;
			startPoint = Tools.getOrigin(currentTarget);
			currentTargetHeight = currentTarget.offsetHeight;
			Tools.addEvent(window, 'mousemove', hsvMove);
			hsv_map.className = 'no-cursor';
			hsvMove(e);
			startRender();
		},
		hsvMove = function(e) {
			var r, x, y, h, s;

			if (currentTarget === hsv_map) {
				r = currentTargetHeight / 2,
				x = e.clientX - startPoint.left - r,
				y = e.clientY - startPoint.top - r,
				h = 360 - ((Math.atan2(y, x) * 180 / Math.PI) + (y < 0 ? 360 : 0)),
				s = (Math.sqrt((x * x) + (y * y)) / r) * 100;
				myColor.setColor({h: h, s: s}, 'hsv');
			} else if (currentTarget === hsv_barCursors) { // the luminanceBar
				myColor.setColor({
					v: (currentTargetHeight - (e.clientY - startPoint.top)) / currentTargetHeight * 100
				}, 'hsv');
			}
		},

		renderHSVPicker = function(color) {
			var pi2 = Math.PI * 2,
				x = Math.cos(pi2 - color.hsv.h * pi2),
				y = Math.sin(pi2 - color.hsv.h * pi2),
				r = color.hsv.s * (colorDiscRadius - 5);

			hsv_mapCover.style.opacity = 1 - color.hsv.v;
			hsv_barWhiteLayer.style.opacity = 1 - color.hsv.s;
			hsv_barBGLayer.style.backgroundColor = 'rgb(' +
				color.hueRGB.r + ',' +
				color.hueRGB.g + ',' +
				color.hueRGB.b + ')';

			hsv_mapCursor.style.cssText =
				'left: ' + (x * r + colorDiscRadius) + 'px;' +
				'top: ' + (y * r + colorDiscRadius) + 'px;' +
				'border-color: ' + (color.RGBLuminance > 0.22 ? '#333;' : '#ddd');
			hsv_barCursors.className = color.RGBLuminance > 0.22 ? hsv_barCursorsCln + ' dark' : hsv_barCursorsCln;
			if (hsv_Leftcursor) hsv_Leftcursor.style.top = hsv_Rightcursor.style.top = ((1 - color.hsv.v) * colorDiscRadius * 2) + 'px';
		};

	Tools.addEvent(hsv_map, 'mousedown', hsvDown); // event delegation
	Tools.addEvent(document.getElementById('hsv_map'), 'mouseup', function() {
		Tools.removeEvent(window, 'mousemove', hsvMove);
		hsv_map.className = '';
		stopRender();
    // console.log(myColor.colors.HEX);
    callback(myColor.colors);
	});

	// generic function for drawing a canvas disc
	var drawDisk = function(ctx, coords, radius, steps, colorCallback) {
			var x = coords[0] || coords,
				y = coords[1] || coords,
				a = radius[0] || radius,
				b = radius[1] || radius,
				angle = 360,
				rotate = 0, coef = Math.PI / 180;

			ctx.save();
			ctx.translate(x - a, y - b);
			ctx.scale(a, b);

			steps = (angle / steps) || 360;

			for (; angle > 0 ; angle -= steps){
				ctx.beginPath();
				if (steps !== 360) ctx.moveTo(1, 1);
				ctx.arc(1, 1, 1,
					(angle - (steps / 2) - 1) * coef,
					(angle + (steps  / 2) + 1) * coef);

				if (colorCallback) {
					colorCallback(ctx, angle);
				} else {
					ctx.fillStyle = 'black';
					ctx.fill();
				}
			}
			ctx.restore();
		},
		drawCircle = function(ctx, coords, radius, color, width) {
			width = width || 1;
			radius = [
				(radius[0] || radius) - width / 2,
				(radius[1] || radius) - width / 2
			];
			drawDisk(ctx, coords, radius, 1, function(ctx, angle) {
				ctx.restore();
				ctx.lineWidth = width;
				ctx.strokeStyle = color || '#000';
				ctx.stroke();
			});
		};

	if (colorDisc.getContext) {
		drawDisk( // draw disc
			colorDisc.getContext('2d'),
			[colorDisc.width / 2, colorDisc.height / 2],
			[colorDisc.width / 2 - 1, colorDisc.height / 2 - 1],
			360,
			function(ctx, angle) {
				var gradient = ctx.createRadialGradient(1, 1, 1, 1, 1, 0);
				gradient.addColorStop(0, 'hsl(' + (360 - angle + 0) + ', 100%, 50%)');
				gradient.addColorStop(1, "#FFFFFF");

				ctx.fillStyle = gradient;
				ctx.fill();
			}
		);
		drawCircle( // gray border
			colorDisc.getContext('2d'),
			[colorDisc.width / 2, colorDisc.height / 2],
			[colorDisc.width / 2, colorDisc.height / 2],
			'#555',
			1
		);
		// draw the luminanceBar bar
		var ctx = luminanceBar.getContext('2d'),
			gradient = ctx.createLinearGradient(0, 0, 0, 300);
		gradient.addColorStop(0, 'transparent');
		gradient.addColorStop(1, 'black');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 30, 300);
	}

	var doRender = function(color) {
			renderTestPatch(color);
			renderHSVPicker(color);
		},
		renderTimer,

		startRender = function(oneTime){
      if (oneTime) { // only Colors is instanciated
				doRender(myColor.colors);
			} else {
				renderTimer = window.setInterval(
					function() {
						doRender(myColor.colors);
					}, 13); // 1000 / 60); // ~16.666 -> 60Hz or 60fps
			}
		},
		stopRender = function(){
			window.clearInterval(renderTimer);
		};

		var myColor = window.myColor = new Colors({color: defaultColor || 'rgba(255, 255, 37, 1)'});

    // initial rendering
		doRender(myColor.colors);
};
