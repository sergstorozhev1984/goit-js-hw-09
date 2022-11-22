const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}
refs.btnStart.addEventListener('click', onBtnStartClick);

refs.btnStop.disabled = true;

refs.btnStop.addEventListener('click', () => {
    clearInterval(changeColorId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
       
});

let changeColorId = null;

function onBtnStartClick(e) {
    changeColorId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
        
    }, 1000);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}