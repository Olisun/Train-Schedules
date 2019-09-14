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

// Setting variable to Firebase method.#
var database = firebase.database();

// Setting global variables. 
var submit = $('#submit-button');
var route = $('#input-for-route');
var destination = $('#input-for-destination');
var firstTrain = $('#input-for-first-train-time');
var departFreq = $('#input-for-frequency');

// Creating event listener function for when the user clicks the submit button. 
submit.on('click', function(event) {
  // First need to prevent the default action of the form's submit button which clears the form. 
  event.preventDefault();
  // Setting variables to the values from the form inputs. 
  var routeInput = $('#input-for-route').val().trim();
  var destinationInput = $('#input-for-destination').val().trim();
  var firstTrainInput = moment($('#input-for-first-train-time').val().trim(), '00:00').format('hh:mm');
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
  // console-logging addTrain's key-value info. 
  console.log(addTrain.route);
  console.log(addTrain.destination);
  console.log(addTrain.firstTrain);
  console.log(addTrain.frequency);
  alert('Train is coming!');
  // This removes the text from the input fields in the form after the the user clicks the submit button. 
  route.val('');
  destination.val('');
  firstTrain.val('');
  departFreq.val('');
});

// Using firebase's built-in methods, this function will add what the user inputed in the form to the firebase database and then appened to the the HTML table. 
database.ref().on('child_added', function(childSnapshot) {
  console.log(childSnapshot.val())
    // Creating variables to store the form input data using firebase's childSnapshot() method. 
  var routeInput = childSnapshot.val().route;
  var destinationInput = childSnapshot.val().destination;
  var firstTrainInput = childSnapshot.val().firstTrain;
  var frequencyInput = childSnapshot.val().frequency;
  // consle-loggin train info. 
  console.log(routeInput);
  console.log(destinationInput);
  console.log(firstTrainInput);
  console.log(frequencyInput);
  // Formatting firstTrainInput. 
  var firstTrainInputFormat = moment.unix(firstTrainInput).format('hh:mm');



});