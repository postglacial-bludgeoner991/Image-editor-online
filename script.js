const fileInput = document.getElementById('fileInput');

const previewImage = document.getElementById('previewImage');

const dropArea = document.getElementById('dropArea');

const emptyText = document.querySelector('.empty-text');

const brightness = document.getElementById('brightness');

const contrast = document.getElementById('contrast');

const saturation = document.getElementById('saturation');

const blur = document.getElementById('blur');

const brightnessValue = document.getElementById('brightnessValue');

const contrastValue = document.getElementById('contrastValue');

const saturationValue = document.getElementById('saturationValue');

const blurValue = document.getElementById('blurValue');

const rotateLeft = document.getElementById('rotateLeft');

const rotateRight = document.getElementById('rotateRight');

const flipHorizontal = document.getElementById('flipHorizontal');

const resetBtn = document.getElementById('resetBtn');

const downloadBtn = document.getElementById('downloadBtn');

const compareBtn = document.getElementById('compareBtn');

const presetButtons = document.querySelectorAll('.preset-btn');


// =======================
// IMAGE STATES
// =======================

let rotate = 0;

let flipX = 1;

let currentFilter = '';


// =======================
// IMAGE UPLOAD
// =======================

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

    previewImage.style.display = "block";

    emptyText.style.display = "none";

});


// =======================
// APPLY FILTERS
// =======================

function applyFilters() {

    // UPDATE VALUES

    brightnessValue.innerHTML = `${brightness.value}%`;

    contrastValue.innerHTML = `${contrast.value}%`;

    saturationValue.innerHTML = `${saturation.value}%`;

    blurValue.innerHTML = `${blur.value}px`;


    // STORE FILTERS

    currentFilter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        saturate(${saturation.value}%)
        blur(${blur.value}px)
    `;


    // APPLY FILTERS

    previewImage.style.filter = currentFilter;


    // APPLY TRANSFORM

    previewImage.style.transform = `
        rotate(${rotate}deg)
        scaleX(${flipX})
    `;

}


// =======================
// FILTER EVENTS
// =======================

brightness.addEventListener('input', applyFilters);

contrast.addEventListener('input', applyFilters);

saturation.addEventListener('input', applyFilters);

blur.addEventListener('input', applyFilters);


// =======================
// ROTATE LEFT
// =======================

rotateLeft.addEventListener('click', () => {

    rotate -= 90;

    applyFilters();

});


// =======================
// ROTATE RIGHT
// =======================

rotateRight.addEventListener('click', () => {

    rotate += 90;

    applyFilters();

});


// =======================
// FLIP IMAGE
// =======================

flipHorizontal.addEventListener('click', () => {

    flipX = flipX === 1 ? -1 : 1;

    applyFilters();

});


// =======================
// RESET IMAGE
// =======================

resetBtn.addEventListener('click', () => {

    brightness.value = 100;

    contrast.value = 100;

    saturation.value = 100;

    blur.value = 0;

    rotate = 0;

    flipX = 1;

    applyFilters();

});


// =======================
// DOWNLOAD IMAGE
// =======================

downloadBtn.addEventListener('click', () => {

    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    const image = new Image();

    image.src = previewImage.src;

    image.onload = () => {

        // CANVAS SIZE

        canvas.width = image.width;

        canvas.height = image.height;


        // APPLY FILTERS

        ctx.filter = currentFilter;


        // MOVE CENTER

        ctx.translate(canvas.width / 2, canvas.height / 2);


        // ROTATE

        ctx.rotate((rotate * Math.PI) / 180);


        // FLIP

        ctx.scale(flipX, 1);


        // DRAW IMAGE

        ctx.drawImage(
            image,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        );


        // DOWNLOAD LINK

        const link = document.createElement('a');

        link.download = 'edited-image.png';

        link.href = canvas.toDataURL();

        link.click();

    };

});


// =======================
// BEFORE / AFTER COMPARE
// =======================

compareBtn.addEventListener('mousedown', () => {

    previewImage.style.filter = 'none';

});


compareBtn.addEventListener('mouseup', () => {

    previewImage.style.filter = currentFilter;

});


// MOBILE SUPPORT

compareBtn.addEventListener('touchstart', () => {

    previewImage.style.filter = 'none';

});


compareBtn.addEventListener('touchend', () => {

    previewImage.style.filter = currentFilter;

});


// =======================
// DRAG & DROP EVENTS
// =======================

// DRAG OVER

dropArea.addEventListener('dragover', (e) => {

    e.preventDefault();

    dropArea.classList.add('drag-active');

});


// DRAG LEAVE

dropArea.addEventListener('dragleave', () => {

    dropArea.classList.remove('drag-active');

});


// DROP IMAGE

dropArea.addEventListener('drop', (e) => {

    e.preventDefault();

    dropArea.classList.remove('drag-active');

    const file = e.dataTransfer.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

    previewImage.style.display = 'block';

    emptyText.style.display = 'none';

});


// =======================
// PRESET FILTERS
// =======================

presetButtons.forEach((button) => {

    button.addEventListener('click', () => {

        const filter = button.dataset.filter;

        // NORMAL

        if (filter === 'normal') {

            brightness.value = 100;

            contrast.value = 100;

            saturation.value = 100;

            blur.value = 0;

        }

        // VINTAGE

        else if (filter === 'vintage') {

            brightness.value = 110;

            contrast.value = 120;

            saturation.value = 80;

            blur.value = 1;

        }

        // COOL

        else if (filter === 'cool') {

            brightness.value = 105;

            contrast.value = 110;

            saturation.value = 130;

            blur.value = 0;

        }

        // BLACK & WHITE

        else if (filter === 'bw') {

            brightness.value = 100;

            contrast.value = 120;

            saturation.value = 0;

            blur.value = 0;

        }

        applyFilters();

    });

});


// =======================
// INITIAL FILTER APPLY
// =======================

applyFilters();