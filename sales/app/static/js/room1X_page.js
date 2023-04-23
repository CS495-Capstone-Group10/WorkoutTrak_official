

'use strict';
const e = React.createElement;




function MyComponent() {

    
  const logout = async (e)=>{
    await localStorage.setItem("salesToken",null);
    window.location = "/login";
  };


    return (


      <div onKeyDown={keyDownHandler}>
      <div style={{background: "#00000060"}}
          className={"modal " + (showModal?" show d-block":" d-none")} tabIndex="-1" role="dialog">
        <div className="modal-dialog shadow">
          <form method="post">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalDescription}</h5>
              <button type="button" className="btn-close" onClick={()=>{setShowModal(false)}} aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div>
            <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required
              value={date} onChange={(e)=>{set_date(e.target.value)}}
              placeholder="0"/><br />
        </div>
        <div class="form-group">
          <label for="time">Time:</label>
          <select id="time" name="time" value={workoutTime} onChange={handleWorkoutTimeChange}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div class="form-group">
          <label for="setWorkoutType">Workout Type:</label>
          <select id="setWorkoutType" name="setWorkoutType" value={setWorkoutType} onChange={handleWorkoutTypeChange}>
            <option value="AT">AT</option>
            <option value="SS">Steady State</option>
            <option value="Race_pace">Race Pace</option>
          </select>
        </div>
              <label htmlFor="interval_type">Select Workout Type:</label>
        <select id="interval_type" name="interval_type" value={rowingType} onChange={HandlesetRowingType}>
          <option value="single_distance">Single Distance</option>
          <option value="single_time">Single Time</option>
          <option value="intervals">Intervals</option>
        </select>
        {rowingType === 'single_distance' && (
          <div>
            <label htmlFor="distance_meters">Distance (meters):</label>
            <input type="number" id="distance_meters" name="distance_meters" 
              value={distance_meters} onChange={(e)=>{set_distance_meters(e.target.value)}}
                         placeholder="0"/><br />
            <label htmlFor="split_length">Split Length(meter):</label>
            <input type="number" id="split_length" name="split_length" 
              value={split_length} onChange={(e)=>{set_split_length(e.target.value)}}
              placeholder="0"/><br />
          </div>
        )}
        {rowingType === 'single_time' && (
          <div>
            <label htmlFor="time_minutes">Time (minutes):</label>
            <input type="number" id="time_minutes" name="time_minutes" 
                value={time_minutes} onChange={(e)=>{set_time_minutes(e.target.value)}}
                placeholder="0"/>
            <label htmlFor="time_seconds">Time (seconds):</label>
            <input type="number" id="time_seconds" name="time_seconds" 
              value={time_seconds} onChange={(e)=>{set_time_seconds(e.target.value)}}
              placeholder="0"/><br />
            <label htmlFor="split_length_minutes">Split Length (minutes):</label>
            <input type="number" id="split_length_minutes" name="split_length_minutes" 
                value={split_length_minutes} onChange={(e)=>{set_split_length_minutes(e.target.value)}}
                placeholder="0"/>
            <label htmlFor="split_length_seconds">Split Length (seconds):</label>
            <input type="number" id="split_length_seconds" name="split_length_seconds" 
                value={split_length_seconds} onChange={(e)=>{set_split_length_seconds(e.target.value)}}
                placeholder="0"/><br />
          </div>
        )}
        {rowingType === 'intervals' && (
  <div>
    <label htmlFor="rowingType">Interval Type:</label>
    <select id="rowingType" name="rowingType" value={rowingType} onChange={HandlesetRowingType}>
      <option value="distance">Distance (meters)</option>
      <option value="time">Time (minutes:seconds)</option>
    </select><br/>
    <label htmlFor="num_intervals">Number of Intervals:</label><br/>
    <input type="number" id="num_intervals" name="num_intervals" 
        value={num_intervals} onChange={(e)=>{set_num_intervals(e.target.value)}}
        placeholder="0"/><br />
    {rowingType === 'distance' && (
      <div>
        <label htmlFor="distanceInt">distance (meters):</label>
        <input type="number" id="distanceInt" name="distanceInt" 
            value={distanceInt} onChange={(e)=>{setdistanceInt(e.target.value)}}
            placeholder="0"/><br />
      </div>
    )}
    {rowingType === 'time' && (
      <div>
        <label htmlFor="rest_length">Workout time:</label>
        <div className="input-group mb-3">
        <label htmlFor="time_minutes">Time (minutes):</label>
            <input type="number" id="time_minutes" name="time_minutes" 
            value={Int_time_minutes} onChange={(e)=>{set_int_time_minutes(e.target.value)}}
            placeholder="0"/><br />
            <label htmlFor="time_seconds">Time (seconds):</label>
            <input type="number" id="split_length_seconds" name="split_length_seconds" 
            value={Int_time_sec} onChange={(e)=>{set_int_time_sec(e.target.value)}}
            placeholder="0"/><br />
        </div>
      </div>
    )}
    <label htmlFor="rest_length">Rest Time:</label>
    <div className="input-group mb-3">
            <label htmlFor="time_minutes">Time (minutes):</label>
            <input type="number" id="time_minutes" name="time_minutes" 
              value={Rest_time_minutes} onChange={(e)=>{set_rest_time_minutes(e.target.value)}}
              placeholder="0"/><br />
            <label htmlFor="time_seconds">Time (seconds):</label>
            <input type="number" id="split_length_seconds" name="split_length_seconds"
            value={rest_time_sec} onChange={(e)=>{set_rest_time_sec(e.target.value)}}
            placeholder="0"/><br />

    </div>
                </div>
                )}
    </div>
                            
              <small className="form-text text-muted">{error}</small>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={()=>{setShowModal(false)}} data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={saveOrder}>Save changes</button>
            </div>
          </div>
          </form>
        </div>
      </div>



      <div>
        <nav className="navbar">
          <div className="navbar__container">
            <a href="/homeX" id="navbar__logo">
              <i className="fas fa-gem"></i>WorkoutTrak : Social
            </a>
            <div className="navbar__toggle" id="mobile-menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className="navbar__menu">
              <li className="navbar__item">
                <a href="/homeX" className="navbar__links">Home</a>
              </li>
              <li className="navbar__item">
                <a href="/workoutsX" className="navbar__links">Workouts</a>
              </li>
              <li className="navbar__item">
                <a href="/athletesX" className="navbar__links">Athletes</a>
              </li>
              <li className="navbar__item">
                <a href="/recordsX" className="navbar__links">Records</a>
              </li>
              <li className="navbar__item">
                <a href="/socialX" className="navbar__links">Social</a>
              </li>
              <li className="navbar__item">
                <a href="/profileX" className="navbar__links">Profile</a>
              </li>
              <li className="navbar__item">
                <a href="/loginX" className="navbar__links" onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </nav> 
  
   
        <div className="main">
          <div className="main__container">
            <div className="main__content">
                <form onSubmit={handleSubmit}>
                  <h1> Personal Info</h1>
                  <h2> First Name </h2>
                  <input type="text" className="input" value={firstName} onChange={handleFirstNameChange}></input>
                  <h2> Last Name </h2>
                  <input type="text" className="input" value={lastName} onChange={handleLastNameChange}></input>
                  <h2> Gender </h2>
                  <input type="text" className="input" value={gender} onChange={handleGenderChange}></input>
                  <h2> Email </h2>
                  <input type="text" className="input" value={email} onChange={handleEmailChange}></input>
                  <h2> Occupation </h2>
                  <input type="text" className="input" value={occupation} onChange={handleOccupationChange}></input>
                  <button type="submit">Save</button>
                </form>
            </div>
          </div>
      </div>


         
          <div className="services">
          <div className="main__content">
      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em", background: "white",
                    padding: "1em"}} className="shadow">
        <div style={{display: "flex", flexDirection: "row", marginBottom: "5px"}}>
          {pages.length > 0 && <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              <li className={"page-item " + (page === 0?"disabled":"")} onClick={(e)=>{
                    e.preventDefault();
                    setPage(Math.max(page-1,0));
              }}><a className="page-link" href="#" aria-label="Previous"><span
                  aria-hidden="true">«</span></a></li>
              {pages.map((el)=><li key={"page" + el.page} onClick={(e)=>{
                  setPage(el.page);
                }} className={"page-item "+(page===el.page?"active":"")}>
                <a className="page-link" href="#">
                  {el.name}
                </a></li>)}
              <li className={"page-item " + (page === pages.length-1?"disabled":"")} onClick={(e)=>{
                    setPage(Math.min(page+1,pages.length-1));
              }}><a className="page-link" href="#" aria-label="Next"><span
                  aria-hidden="true">»</span></a></li>
            </ul>
          </nav>}
        </div>
        <div>
      <WorkoutTable workouts={list} />
        </div>
      </div>
      </div>
           
         </div> 
  
         <script type="text/jsx" src="/static/js/app2.js"></script> 
         </div>
      </div>
    );
  }



const domContainer = document.querySelector('#reactAppContainer');
    ReactDOM.render(
        e(MyComponent),
    domContainer
);