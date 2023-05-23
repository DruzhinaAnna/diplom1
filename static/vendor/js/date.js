var date = document.getElementById('one');
var time = document.getElementById('two');
var dateObj = new Date();
date.value = dateObj.toISOString().slice(0,10)
time.value = dateObj.getHours() + ':' + dateObj.getMinutes();