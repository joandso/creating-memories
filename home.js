window.addEventListener('load', function() {
    updateColors();

    var intervalId = setInterval(function() {
        var unprocessedElements = document.querySelectorAll('.region-colour:not(.processed)');
        if (unprocessedElements.length > 0) {
            updateColors();
        } else {
            clearInterval(intervalId);
        }
    }, 5000);
});

function updateColors() {
    var elements = document.querySelectorAll('.region-colour-parent');
    elements.forEach(parent => {
        var hex = rgbToHex(window.getComputedStyle(parent).backgroundColor);
        var siblings = parent.closest('.sl-home_card').querySelectorAll('.region-colour:not(.processed)');
        siblings.forEach(sibling => {
            sibling.style.backgroundColor = hex;
            sibling.classList.add('processed');
            sibling.style.opacity = '1'; // set opacity to 1
        });
    });
}

document.querySelectorAll('.region-colour').forEach(el => {
    if (el.previousElementSibling) {
        const color = el.previousElementSibling.style.backgroundColor;
        el.style.backgroundColor = color + ' !important';
    }
});

function rgbToHex(rgb) {
    var values = rgb.match(/(\d+)/g);
    var r = parseInt(values[0]);
    var g = parseInt(values[1]);
    var b = parseInt(values[2]);
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
