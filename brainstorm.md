# This file is for planning the app build and pseudo coding.

## Requirements:
1. User enters route name, destination, train time, frequency into a form with input fields.
2. User clicks a submit button and a table will fill with info on the train name, destiantion, departure time and minutes away from arrival (count-down timer).

## To-Do:
1. HTML table, form, submit button.
2. Firebase:
   a. Need to create an object to store train schedule data in js file and then push that object into Firebase using methods learned in class.
   b. Need function for firebase to send the train schedule data into the table on the DOM when the submit button is clicked.
   c. Need to store the data in firebsase.
3. JS:
   a. Need to be able to grab the user input from the form fields. Can use giphy hw as a reference point. Also review firebase class activities. 
   b. Need countdown clock. Can reference the quiz homework.
4. Moment.js for the time formatting.
5. Add to portfolio pages (FIX FORMATTING!)


## Topics to review:
  1. DOM append methods from recent hw
  2. Firebase snapshot methods. Everything Firebase!
  3. Moment.js
  4. Setting time methods from trivia game hw
  5. Bootstrap for layout

## Psuedo Code:
  1. for calculating next arrival:
    a. first train time + frequency
  2. for calculating minutes away:
    b. current time + frequency
  
## Bugs
  1. table info not appending back to the DOM. Error message says frequency var not defind. 
  2. Current time not showing up in the div set up for it. 
  3. (Bonus Goal): trying to get Minutes Away column dynamic. Not working so far.

