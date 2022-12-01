window.addEventListener('DOMContentLoaded', init);

function init() {
  var but1 = document.querySelector('.pause');
  var but2 = document.querySelector('.save');
  var timer = document.querySelectorAll('#timer');
  var sec = document.querySelector('.sec1upper');
  var start, end;
  but1.addEventListener('click', () => {
    if(but1.textContent == 'Start') {
        but1.textContent = 'Pause';
        start = performance.now();
        timer.forEach((element) => {
          element.style.animationPlayState = 'running';
        });
    }
    else if(but1.textContent == 'Pause') {
        but1.textContent = 'Reset';
        but2.style.visibility = "visible";
        end = performance.now();
        timer.forEach((element) => {
            element.style.animationPlayState = 'paused';
        });
    }
    else {
        but1.textContent = 'Start';
        but2.style.visibility = "hidden";
        timer.forEach((el) => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 
        });
    }
  });
  but2.addEventListener('click', () => {
    let time = Math.round((end - start)/1000);
    let min = Math.round(time/60);
    let sec = time%60;
    if(sec < 10) sec = `0${sec}`;
    if(min < 10) min = `0${min}`;
    let recipe = JSON.parse(localStorage.getItem(`newRecipe${localStorage.length}`));
    recipe['time'] = `${min}:${sec}`;
    localStorage.setItem(`newRecipe${localStorage.length}`, JSON.stringify(recipe));
  });
}