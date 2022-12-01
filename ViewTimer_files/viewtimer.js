window.addEventListener('DOMContentLoaded', init);

function init() {
    let selectRecipe = localStorage.getItem('selectRecipe');
    let recipe = JSON.parse(localStorage.getItem(selectRecipe));
    let input = document.querySelectorAll('input');
    let stopTime = document.querySelector('.timetostop');
    stopTime.textContent = recipe['time'];
    input.forEach((el) => {
        el.value = recipe[el.name];
    });
    var but1 = document.querySelector('.start');
    var but2 = document.querySelector('.pause');
    var timer = document.querySelectorAll('#timer');
    var time = recipe['time'];
    var minAndSec = time.split(':');
    var min = minAndSec[0];
    var sec = minAndSec[1];
    var ms = 1000;
    var timeInMs = (Math.floor(min/10) * 600 + min%10 * 60 + Math.floor(sec/10) * 10 + sec%10)*ms;
    console.log(timeInMs);
    var sec = document.querySelector('.sec1upper');
    var coffee = document.querySelector('.loader');
    let t;
    let alarm = document.querySelector('.alarm');
    function tout() {
        t = setTimeout(() => {
            but2.click();
            alarm.play();
        }, timeInMs);
    }
    but1.addEventListener('click', () => {
        but1.style.visibility = "hidden";
        coffee.style.visibility = "visible";
        timer.forEach((element) => {
            element.style.animationPlayState = 'running';
        });
        tout();
    });
    but2.addEventListener('click', () => {
        but1.style.visibility = "visible";
        coffee.style.visibility = "hidden";
        clearTimeout(t);
        timer.forEach((el) => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 
        });
    });
}


