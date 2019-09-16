var currentTimeDOM = $('#current-time-dom');

var dynamicTime = function() {
  var currentTime = moment();
  var currentTimeFormatted = moment(currentTime).format('HH:mm:ss');
  currentTimeDOM.text(currentTimeFormatted);
}
setInterval(dynamicTime, 1000);
currentTimeDOM.text(dynamicTime);