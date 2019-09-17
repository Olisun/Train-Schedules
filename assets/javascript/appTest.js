var currentTimeDOM = $('#current-time-dom');

var dynamicTime = function() {
  var currentTime = moment();
  var currentTimeFormatted = moment(currentTime).format('HH:mm:ss');
  currentTimeDOM.text(currentTimeFormatted);
}
setInterval(dynamicTime, 1000);
currentTimeDOM.text(dynamicTime);

// Experimenting with trying to make nextArrival dynamic.

var nextArrivalDynamic = function() {
  var nextArrival = frequencyInput - timeRemainder;
  var nextArrivalFormatted = moment(nextArrival).format('mm:ss');
  $('<td>').text(nextArrivalFormatted);
};

nextArrivalDynamic();
setInterval(nextArrivalDynamic, 1000);

var nextArrivalAdd = moment().add(nextArrival, 'minutes');
var nextTrainArrival = moment(nextArrivalAdd).format('HH:mm');
console.log('Time Arriving: ' + nextTrainArrival);


var tableRow = $('<tr>');

tableRow.append(
  $('<td>').text(routeInput),
  $('<td>').text(destinationInput),
  $('<td>').text(frequencyInput),
  $('<td>').text(nextTrainArrival),
  $('<td>').text(nextArrivalDynamic),
)