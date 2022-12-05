import { isTea, swapToTeaColorTheme, getSelectedRecipe } from "../utils/utils.js";
// Once the HTML document has been completely parsed, call the initializing function
window.addEventListener('DOMContentLoaded', init);
/*
* Function init initializes the webpage that enables the user
* to press a start button and/or pause button on a timer as needed 
* for their caffeine brewing.
* The function gets the user's selected recipe from the local storage,
* gathers the brew time from that recipe, then uses that time as
* a reference point for when the timer should end and ring an alarm.
*/
function init() {
    let recipe = getSelectedRecipe(); // Assigns selected recipe to 'recipe' variable
    if (isTea(recipe)) { // If the recipe is a tea recipe,
      swapToTeaColorTheme(); // Change the color to match the tea theme
    }
    let input = document.querySelectorAll('input'); // Assign input from html into 'input' variable ** 
    let stopTime = document.querySelector('.timetostop'); // Assign time to stop from html into 'stopTime' variable **
    stopTime.textContent = recipe['Brew_Time']; // Change the text content of stopTime to the brew time of our recipe 
    input.forEach((el) => { // For each element from the input,
        el.value = recipe[el.name]; // the recipe of the element is assigned to the element's value
    });
    var but1 = document.querySelector('.start'); // Assign the start button to the 'but1' variable 
    var but2 = document.querySelector('.pause'); // Assign the pause button to the 'but2' variable 
    var timer = document.querySelectorAll('#timer'); // Assign timer digits to the 'timer' variable
    var time = recipe['Brew_Time']; // Assign the brew time from our selected recipe to the 'time' variable
    var minAndSec = time.split(':'); // Assign the 'minAndSec' variable the brew time, but split it into minutes and seconds
    var min = minAndSec[0]; // Assign the minutes from brew time to the 'min' variable
    var sec = minAndSec[1]; // Assign the seconds from brew time to the 'sec' variable
    var ms = 1000; // To convert into milliseconds, let the 'ms' variable be 1000
    // Store time in milliseconds within 'timeInMs' variable. Math.floor rounds down to largest int less or equal to given number. 
    var timeInMs = (Math.floor(min/10) * 600 + min%10 * 60 + Math.floor(sec/10) * 10 + sec%10)*ms; 
    console.log(timeInMs); // Print the time in milliseconds to the console
    var sec = document.querySelector('.sec1upper'); // Select the first digit of the seconds and assign to 'sec' variable
    var coffee = document.querySelector('.loader'); // Assign loader to the 'coffee' variable
    let t; // Declare 't' variable, which we'll use to call the setTimeout method
    let alarm = document.querySelector('.alarm'); // Assign alarm to the 'alarm' variable
    /*
    * The tout function uses the setTimeout method to sets a timer
    * with the time in milliseconds from our recipe's brew time.
    * Once the timer runs out, the function is executed. 
    * So, the pause button will click, pausing the timer,
    * and then the alarm will play.
    */
     function tout() {
        t = setTimeout(() => { // Let t be the timer set by the setTimeout method
            but2.click(); // Pause the timer
            alarm.play(); // Play the alarm
        }, timeInMs); // The function will execute after counting down completely from timeInMs
    }
    /*
    * When the start button is clicked:
    * 1. The start button will be hidden
    * 2. The timer digits will be animated, counting up as time goes on
    * 3. The tout function will be called to set a timer
    */
    but1.addEventListener('click', () => {
        but1.style.visibility = "hidden"; // Hide the start button
        coffee.style.visibility = "visible"; // Keep the reset button and stop time visible
        timer.forEach((element) => { // For each element (digit) from our timer,
            element.style.animationPlayState = 'running'; // Run the animation so that the digits count up
        });
        tout(); // Call the tout function to set a timer
    });
    /*
    * When the pause button is clicked:
    * 1. Show the start button to begin counting up again
    * 2. Hide the reset button and stop time
    * 3. Clear the timer that was set using the tout function
    * 4. Stop the animations for each digit in the timer
    */
    but2.addEventListener('click', () => {
        but1.style.visibility = "visible"; // Show start button
        coffee.style.visibility = "hidden"; // Hide reset button and stop time
        clearTimeout(t); // Clear timer t using clearTimeout method
        timer.forEach((el) => { // For each digit in our timer,
            el.style.animation = 'none'; // Stop the animations
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 
        });
    });
}
