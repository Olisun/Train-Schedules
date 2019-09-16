// Taking my Firebase configuration settings straight from the wehsite and creating and object.
var firebaseConfig = {
  apiKey: "AIzaSyAnfB4KI8rWLaQfRuf3umQlPVw-xreonvw",
  authDomain: "bootcamp-266ad.firebaseapp.com",
  databaseURL: "https://bootcamp-266ad.firebaseio.com",
  projectId: "bootcamp-266ad",
  storageBucket: "bootcamp-266ad.appspot.com",
  messagingSenderId: "425399544190",
  appId: "1:425399544190:web:3e2e9b6c003da7f2082b2f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setting variable to Firebase method.
var database = firebase.database();

// Making a variables for the form submit button and the refresh button;
var submit = $('#submit-button');
var refresh = $('#refresh');

refresh.on('click', function() {
  location.reload(true);
})

// Creating event listener function for when the user clicks the submit button. 
submit.on('click', function(event) {

  // First need to prevent the default action of the form's submit button which clears the form. 
  event.preventDefault();

  // Setting variables to capture the values from the user's form inputs. 
  var routeInput = $('#input-for-route').val().trim();
  var destinationInput = $('#input-for-destination').val().trim();
  var firstTrainInput = moment($('#input-for-first-train-time').val().trim(), 'HH:mm').format('HH:mm'); // <-- The .format() formats the time into military time.
  var frequencyInput = $('#input-for-frequency').val().trim();

  // Creating an object to store the form data. 
  var addTrain = {
    route: routeInput,
    destination: destinationInput,
    firstTrain: firstTrainInput,
    frequency: frequencyInput,
  };

  // This is a firebase method that pushes the variable above to the firebase database. 
  database.ref().push(addTrain);

  // console-logging addTrain's key-value info. so I can use devtools to inspect.
  console.log(addTrain.route);
  console.log(addTrain.destination);
  console.log(addTrain.firstTrain);
  console.log(addTrain.frequency);
  alert('Schedule Updated');

  // This removes the text from the input fields in the form after the the user clicks the submit button. 
  $('#input-for-route').val('');
  $('#input-for-destination').val('');
  $('#input-for-first-train-time').val('');
  $('#input-for-frequency').val('');
});

// Using firebase's built-in methods, this main function will add what the user inputed in the form to the firebase database and then appened to the the HTML table. 
database.ref().on('child_added', function(childSnapshot) {
  console.log(childSnapshot.val())

  // Creating variables to store the form input data using firebase's childSnapshot() method. 
  var routeInput = childSnapshot.val().route;
  var destinationInput = childSnapshot.val().destination;
  var firstTrainInput = childSnapshot.val().firstTrain;
  var frequencyInput = childSnapshot.val().frequency;

  // cons0le-loggin train info for inspection.
  console.log(routeInput);
  console.log(destinationInput);
  console.log(firstTrainInput);
  console.log(frequencyInput);

  // Formatting firstTrainInput into military time.
  var firstTrainInputFormat = moment(firstTrainInput).format('HH:mm');

  // Using a built-in moment method, this ensures the First Train Time entered on the DOM is set one year before the current train time.
  var firstTrainConverted = moment(firstTrainInput, 'HH:mm').subtract(1, 'years');
  console.log(firstTrainConverted);

  // Setting a variable for the current time clock on the DOM. 
  var currentTimeDOM = $('#current-time-dom');

  // This fumnction uses moment's time method to format the clock time in military time to the seconds.
  var currentTimeClock = function() {
    var currentTime = moment();
    var currentTimeFormatted = moment(currentTime).format('HH:mm:ss');
    currentTimeDOM.text(currentTimeFormatted);
  }

  // Using setInterval method to make the clock dynamic. 
  setInterval(currentTimeClock, 1000);
  currentTimeDOM.text(currentTimeClock);

  // This moment method gets the difference between the times of firstTrainConverted and current time.
  var timeDifference = moment().diff(moment(firstTrainConverted), 'minutes')
  console.log('Time Difference: ' + timeDifference);

  // Using the modal operator will determine the time apart by finding the remainder of the time difference and the frequency.

  var timeRemainder = timeDifference % frequencyInput;
  console.log(timeRemainder);

  // Determining the minutes till the next train by subtracting the remainder of the 1 year timeDifference calculated above from the departure frequency that the user enters on the form before when submitting.
  var nextArrival = frequencyInput - timeRemainder;
  console.log('Next Arrival: ' + nextArrival);



  // Determing the next arrival time with moment built-in methods. 
  var nextArrivalAdd = moment().add(nextArrival, 'minutes');
  var nextTrainArrival = moment(nextArrivalAdd).format('HH:mm');
  console.log('Time Arriving: ' + nextTrainArrival);

  // Now we take the data pushed up to firebase along with the calculations above and prepend all the info to the HTML table. 
  var tableRow = $('<tr>');

  tableRow.append(
    $('<td>').text(routeInput),
    $('<td>').text(destinationInput),
    $('<td>').text(frequencyInput),
    $('<td>').text(nextTrainArrival),
    $('<td>').text(nextArrival),
  )

  // Finally we are appending the newly created rows to the HTML table. 
  var trainScheduleTable = $('#for-append');
  trainScheduleTable.append(tableRow);
});