'use strict';
const e = React.createElement;
function App() {
    
  const [workoutType, setWorkoutType] = React.useState('single_distance');
  const [intervalVariableType, setIntervalVariableType] = React.useState('distance');
  const [distanceFrom, setDistanceFrom] = React.useState('0');
  const [workoutData, setWorkoutData] = React.useState(null);

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };
  const HandlesetIntervalVariableType = (event) => {
    setIntervalVariableType(event.target.value);
  };

  const handleDisFrom = (event) => {
    setDistanceFrom(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setWorkoutData(data);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="interval_type">Select Workout Type:</label>
        <select id="interval_type" name="interval_type" value={workoutType} onChange={handleWorkoutTypeChange}>
          <option value="single_distance">Single Distance</option>
          <option value="single_time">Single Time</option>
          <option value="intervals">Intervals</option>
        </select>
        {workoutType === 'single_distance' && (
          <div>
            <label htmlFor="distance_meters">Distance (meters):</label>
            <input type="number" id="distance_meters" name="distance_meters" /><br />
            <label htmlFor="split_length">Split Length(meter):</label>
            <input type="number" id="split_length" name="split_length" /><br />
          </div>
        )}
        {workoutType === 'single_time' && (
          <div>
            <label htmlFor="time_minutes">Time (minutes):</label>
            <input type="number" id="time_minutes" name="time_minutes" />
            <label htmlFor="time_seconds">Time (seconds):</label>
            <input type="number" id="time_seconds" name="time_seconds" /><br />
            <label htmlFor="split_length_minutes">Split Length (minutes):</label>
            <input type="number" id="split_length_minutes" name="split_length_minutes" />
            <label htmlFor="split_length_seconds">Split Length (seconds):</label>
            <input type="number" id="split_length_seconds" name="split_length_seconds" /><br />
          </div>
        )}
        {workoutType === 'intervals' && (
  <div>
    <label htmlFor="interval_variable_type">Interval Type:</label>
    <select id="interval_variable_type" name="interval_variable_type" value={intervalVariableType} onChange={HandlesetIntervalVariableType}>
      <option value="distance">Distance (meters)</option>
      <option value="time">Time (minutes:seconds)</option>
    </select>
    <label htmlFor="num_intervals">Number of Intervals:</label>
    <input type="number" id="num_intervals" name="num_intervals" /><br />
    {intervalVariableType === 'distance' && (
      <div>
        <label htmlFor="distanceFrom">distance (meters):</label>
        <input 
          type="number"
          id="distanceFrom"
          name="distanceFrom"
          value={distanceFrom}
          onChange={handleDisFrom}
          placeholder="0"
          min="0"
          max="100000"
          className="form-control"
        />
      </div>
    )}
    {intervalVariableType === 'time' && (
      <div>
        <label htmlFor="rest_length">Workout time:</label>
        <div className="input-group mb-3">
        <label htmlFor="time_minutes">Time (minutes):</label>
            <input type="number" id="time_minutes" name="time_minutes" />
            <label htmlFor="time_seconds">Time (seconds):</label>
            <input type="number" id="split_length_seconds" name="split_length_seconds" /><br />
        </div>
      </div>
    )}
    <label htmlFor="rest_length">Rest Time:</label>
    <div className="input-group mb-3">
            <label htmlFor="time_minutes">Time (minutes):</label>
            <input type="number" id="time_minutes" name="time_minutes" />
            <label htmlFor="time_seconds">Time (seconds):</label>
            <input type="number" id="split_length_seconds" name="split_length_seconds" /><br />

    </div>
                </div>
                )}
                <button type="submit">Generate Workout</button>
        </form>
    </div>
);
}
const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(App),
  domContainer
);
