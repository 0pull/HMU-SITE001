const labhmu = document.getElementById('labhmu');
const fonts = ["Arial", "Verdana", "Courier New", "Georgia", "Times New Roman", "Impact"];
let fontIndex = 0;

setInterval(() => {
    labhmu.style.fontFamily = fonts[fontIndex];
    fontIndex = (fontIndex + 1) % fonts.length;
}, 100);