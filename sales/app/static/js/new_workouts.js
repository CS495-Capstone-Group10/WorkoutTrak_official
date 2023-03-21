// select form element
const form = document.querySelector('#workout-form');

// add submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // get form values
  const date = document.querySelector('#date').value;
  const workoutType = document.querySelector('#workout-type').value;
  const meters = document.querySelector('#meters').value;
  const minutes = document.querySelector('#minutes').value;
  const repetitions = document.querySelector('#repetitions').value;
  const coolDownMeters = document.querySelector('#cool-down-meters').value;
  const coolDownMinutes = document.querySelector('#cool-down-minutes').value;
  const warmUpMeters = document.querySelector('#warm-up-meters').value;
  const warmUpMinutes = document.querySelector('#warm-up-minutes').value;

  // validate form values
  if (!date) {
    alert('Please enter a valid date');
    return;
  }

  if (!time) {
    alert('Please enter a valid time');
    return;
  }

  if (!workoutType) {
    alert('Please select a workout type');
    return;
  }

  if (meters && !isNumeric(meters)) {
    alert('Please enter a valid amount of meters');
    return;
  }

  if (minutes && !isNumeric(minutes)) {
    alert('Please enter a valid amount of minutes');
    return;
  }

  if (!repetitions || !isNumeric(repetitions)) {
    alert('Please enter a valid number of repetitions');
    return;
  }

  if (coolDownMeters && !isNumeric(coolDownMeters)) {
    alert('Please enter a valid amount of cool down meters');
    return;
  }

  if (coolDownMinutes && !isNumeric(coolDownMinutes)) {
    alert('Please enter a valid amount of cool down minutes');
    return;
  }

  if (warmUpMeters && !isNumeric(warmUpMeters)) {
    alert('Please enter a valid amount of warm up meters');
    return;
  }

  if (warmUpMinutes && !isNumeric(warmUpMinutes)) {
    alert('Please enter a valid amount of warm up minutes');
    return;
  }

  // create workout object
  const workout = {
    date: `${date} ${time}`,
    workoutType,
    meters: meters || null,
    minutes: minutes || null,
    repetitions: parseInt(repetitions),
    coolDownMeters: coolDownMeters || null,
    coolDownMinutes: coolDownMinutes || null,
    warmUpMeters: warmUpMeters || null,
    warmUpMinutes: warmUpMinutes || null,
  };

  // TODO: send workout data to server

  // reset form
  form.reset();
});

// helper function to check if a value is numeric
function isNumeric(value) {
  return /^\d+$/.test(value);
}
