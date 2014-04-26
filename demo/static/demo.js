'use strict';

/* globals Cut */

var form = document.getElementById('cut');
var cutImage = document.getElementById('cut-image');

var cut = new Cut(cutImage, {
	cropWidth: 120,
	cropHeight: 120
});

var controls = document.createElement('div');
controls.id = 'controls';

var slider = document.createElement('input');
slider.id = 'zoom-slider';
slider.type = 'range';
slider.min = cut.scaleMinimum.toFixed(2);
slider.max = 1;
slider.step = 0.01;
slider.value = 1;

function sliderChanged() {
	var zoom = +slider.value;

	if (zoom < +slider.min) {
		zoom = +slider.min;
	} else if (!(zoom <= 1)) {
		zoom = 1;
	}

	cut.zoomTo(zoom);
}

slider.addEventListener('input', sliderChanged, false);
slider.addEventListener('change', sliderChanged, false);

cut.on('zoom', function (zoom) {
	slider.value = zoom;
});

var buttons = document.createElement('span');

var containButton = document.createElement('input');
containButton.id = 'contain-button';
containButton.className = 'button';
containButton.type = 'button';
containButton.title = 'Contain';
containButton.value = '∈';

containButton.addEventListener('click', function () {
	cut.contain();
}, false);

var coverButton = document.createElement('input');
coverButton.id = 'cover-button';
coverButton.className = 'button';
coverButton.type = 'button';
coverButton.title = 'Cover';
coverButton.value = '∋';

coverButton.addEventListener('click', function () {
	cut.cover();
}, false);

buttons.appendChild(containButton);
buttons.appendChild(coverButton);
controls.appendChild(slider);
controls.appendChild(buttons);
form.appendChild(controls);

var cropCoordinates = document.getElementById('crop-coordinates');

if (cropCoordinates) {
	cropCoordinates.parentNode.removeChild(cropCoordinates);

	if (cropCoordinates.classList.contains('ended')) {
		var startX = parseInt(cropCoordinates.style.left, 10);
		var startY = parseInt(cropCoordinates.style.top, 10);
		var width = parseInt(cropCoordinates.style.width, 10);
		var zoom = 120 / width;

		cut.offsetX = (cutImage.width / 2 - startX) * zoom - 60;
		cut.offsetY = (cutImage.height / 2 - startY) * zoom - 60;
		cut.zoomTo(zoom);
	}
}
