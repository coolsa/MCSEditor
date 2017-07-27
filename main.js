// Keywords: function, execute, var
// Variables/Identifiers: $something
// Comments #, //


var inputVal = '', showOutput = false, currentOutput = null;
var cursorText = document.getElementById('cursor-pos');
var compiled = document.getElementById('cont-compiled');
var original = document.getElementById('cont-original');
var msgObj = document.getElementById('msg');
var outputTitles = document.getElementById('output-titles');

//var mcsMode = CodeMirrorGrammar.getMode(mcsGrammar);

//CodeMirror.defineMode("mcs", mcsMode);

var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
	lineNumbers: true,
	theme: 'one-dark',
	mode: 'mcs'
});

var outputEditor = CodeMirror.fromTextArea(document.getElementById('output-editor'), {
	lineNumbers: true,
	theme: 'one-dark',
	mode: 'mcs',
	readOnly: true
});

// Update on first frame
updateCursorInfo(editor);

// Horizontal scrolling for output mini-titles
(function() {
	function scrollHorizontally(e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		outputTitles.scrollLeft -= (delta*40); // Multiplied by 40
		e.preventDefault();
	}
	if (outputTitles.addEventListener) {
		// IE9, Chrome, Safari, Opera
		outputTitles.addEventListener("mousewheel", scrollHorizontally, false);
		// Firefox
		outputTitles.addEventListener("DOMMouseScroll", scrollHorizontally, false);
	} else {
		// IE 6/7/8
		outputTitles.attachEvent("onmousewheel", scrollHorizontally);
	}
})();

editor.on('change', function(cm) {
	inputVal = cm.getValue();
});

editor.on('cursorActivity', updateCursorInfo);

document.getElementById('compile-btn').addEventListener('click', function () {
	if (!showOutput) {
		if (!inputVal) {
			showMsg('Input is empty!', 'error');
			return;
		}

		var output;
		try {
			output = mcs(inputVal);
		}
		catch(err) {
			showMsg(err, 'error');
			return;
		}

		showOutput = true;
		currentOutput = output;
		this.textContent = 'Edit';

		// Remove every tabs
		while (outputTitles.firstChild) {
			outputTitles.removeChild(outputTitles.firstChild);
		}

		// Create new tabs
		for(var fileN in Object.keys(output)){
			(function () {
				var fileName = Object.keys(output)[fileN];
				var file = output[fileName];
				var fileTab = document.createElement('div');
				fileTab.classList = 'mini-title';
				fileTab.textContent = fileName;
				outputTitles.appendChild(fileTab);

				// Add click events
				fileTab.addEventListener('click', function () {
					selectTab(this);
					outputEditor.setValue(JSON.stringify(file).split('').slice(1, -1).join('').replace(/(?:\\[rn])+/g, "\n").replace(/(?:\\")/g, '"'));
					setTimeout(function() {
						outputEditor.refresh();
					},1);
				});

				// Auto-focus the first tab
				if (fileN == 0) {
					selectTab(fileTab);
					outputEditor.setValue(JSON.stringify(file).split('').slice(1, -1).join('').replace(/(?:\\[rn])+/g, "\n").replace(/(?:\\")/g, '"'));
					setTimeout(function() {
						outputEditor.refresh();
					},1);
					outputEditor.focus();
				}
			})();
		}

		if (isOverflown(outputTitles) || outputTitles.children.length > 5) {
			outputTitles.classList = 'output-titles scroll';
		} else {
			outputTitles.classList = 'output-titles';
		}

		// Show compiled, hide original
		if (compiled.classList.contains('hidden')) {
			compiled.classList.remove('hidden');
		}
		if (!original.classList.contains('hidden')) {
			original.classList.add('hidden');
		}
	} else {
		showOutput = false;

		this.textContent = 'Compile';

		// Hide compiled, show original
		if (!compiled.classList.contains('hidden')) {
			compiled.classList.add('hidden');
		}
		if (original.classList.contains('hidden')) {
			original.classList.remove('hidden');
		}
	}
});

function selectTab(tab) {
	var children = outputTitles.children;
	for (var i = 0; i < children.length; i++) {
		children[i].classList = 'mini-title';
	}
	tab.classList = 'mini-title tab-active';
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function updateCursorInfo (e) {
	var cursor = e.getCursor();
	var text = (cursor.line + 1) + ':' + (cursor.ch + 1);
	cursorText.textContent = text;
}

function showMsg(msg, classToAdd) {
	msgObj.textContent = msg;
	msgObj.classList = 'btn ' + classToAdd;
}

document.getElementById('msg').addEventListener('click', function () {
	this.classList = 'hidden';
});
