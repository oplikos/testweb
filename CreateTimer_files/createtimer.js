import {isTea, swapToTeaColorTheme, getCurrentRecipe} from '../utils/utils.js';


// Once the HTML document has been completely parsed and all deferred scripts have downloaded and executed, call the init function

window.addEventListener('DOMContentLoaded', init);

/*
* The init function initializes the webpage that enables a user
* to click a button to start a timer that counts up and stops when
* the button is clicked one more time. 
* Also, the user may reset the timer as needed to begin timing again.
* Afterwards, the user may save the time to be inserted within their recipe as the brew time.
*/
function init() {
  let recipe = getCurrentRecipe(); // Call getCurrentRecipe from utils to assign selected recipe to 'recipe' var
  if (isTea(recipe)) { // If the recipe is a tea recipe,
    swapToTeaColorTheme(); // Change the color to match the tea theme
  }

  var but1 = document.querySelector('.pause'); // Assign the pause button to the 'but1' var
  var but2 = document.querySelector('.save'); // Assign the save button to the 'but2' var
  var timer = document.querySelectorAll('#timer'); // Let all digit pieces from #timer be assigned to the 'timer' var
  var sec = document.querySelector('.sec1upper'); // Select the first second digit and assign to 'sec'
  var start, end;

  /*
  * When the first button is clicked, 3 things may happen.
  * 1. A timer will start and the button will change to say 'Pause', so you may stop the timer.
  * 2. A timer will stop and the button will change to say 'Reset', so that the timer will go back to 00:00. Also, you can save the time.
  * 3. The display will reset so that the button says 'Start' again.
  */
  but1.addEventListener('click', () => {
    if(but1.textContent == 'Start') { // If the button says 'Start' currently,
        but1.textContent = 'Pause'; // Change it so it says 'Pause'
        start = performance.now(); // Assign the current time in milliseconds to 'start' variable
        timer.forEach((element) => { // For each digit or section in the timer,
          element.style.animationPlayState = 'running'; // Run the animation so it starts counting
        });
    }
    else if(but1.textContent == 'Pause') { // If the button currently says 'Pause',
        but1.textContent = 'Reset'; // Change the button to say 'Reset'
        but2.style.visibility = "visible"; // Show the save button
        end = performance.now(); // Assign the current time in milliseconds to 'end' variable
        timer.forEach((element) => { // For each digit or section in the timer,
            element.style.animationPlayState = 'paused'; // Pause the animation so it stops counting
        });
    }
    else { // Otherwise, when the button says 'Reset',
        but1.textContent = 'Start'; // Make the button say 'Start'
        but2.style.visibility = "hidden"; // Hide the save button
        timer.forEach((el) => { // For each digit or section in the timer,
            el.style.animation = 'none'; // Do not animate the counting
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 
        });
    }
  });

  /*
  * When the second button is clicked,
  * the time duration from starting and pausing the timer will 
  * be calculated and then saved into local storage under the new recipe
  */
  but2.addEventListener('click', () => {
    let time = Math.round((end - start)/1000); // Get time in milliseconds from when we started until when we paused
    let min = Math.round(time/60); // Get the minutes from our time
    let sec = time%60; // Get the seconds from our time
    if(sec < 10) sec = `0${sec}`; 
    if(min < 10) min = `0${min}`;
    let index = localStorage.getItem('index');
    let recipe = JSON.parse(localStorage.getItem(`newRecipe${index}`)); // JSON parse the recipe so it may be used
    recipe['Brew_Time'] = `${min}:${sec}`; // Change the brew time to the calculated minutes and seconds
    localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipe)); // Store new recipe changes into local storage
  });
}