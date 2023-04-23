

'use strict';
const e = React.createElement;




function MyComponent() {
  const [list, setList] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [pages, setPages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalDescription, setModalDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [distance_meters, set_distance_meters] = React.useState(0);
  const [split_length, set_split_length] = React.useState(0);
  const [time_minutes, set_time_minutes] = React.useState(0);
  const [time_seconds, set_time_seconds] = React.useState(0);
  const [split_length_minutes, set_split_length_minutes] = React.useState(0);
  const [split_length_seconds, set_split_length_seconds] = React.useState(0);
  const [num_intervals, set_num_intervals] = React.useState(0);
  const [distanceInt, setdistanceInt] = React.useState(0);
  const [Int_time_minutes, set_int_time_minutes] = React.useState(0);
  const [Int_time_sec, set_int_time_sec] = React.useState(0);
  const [Rest_time_minutes, set_rest_time_minutes] = React.useState(0);
  const [rest_time_sec, set_rest_time_sec] = React.useState(0);
  const [date, set_date] = React.useState(0);
  const [rowingType, setRowingType] = React.useState('single_distance');
  const [workoutType, setWorkoutType] = React.useState('AT');
  // const [intervalVariableType, setIntervalVariableType] = React.useState('Interval distance');
  const [workoutTime, setWorkoutTime] = React.useState('AM');
  

  const [firstName, setFirstName] = React.useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = React.useState(localStorage.getItem('lastName') || '');
  const [gender, setGender] = React.useState(localStorage.getItem('gender') || '');
  const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
  const [occupation, setOccupation] = React.useState(localStorage.getItem('occupation') || '');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    localStorage.setItem('firstName', event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    localStorage.setItem('lastName', event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    localStorage.setItem('gender', event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    localStorage.setItem('email', event.target.value);
  };

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
    localStorage.setItem('occupation', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Gender:', gender);
    console.log('Email:', email);
    console.log('Occupation:', occupation);
  };








  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };
  const handleWorkoutTimeChange = (event) => {
    setWorkoutTime(event.target.value);
  };
  const HandlesetRowingType = (event) => {
    setRowingType(event.target.value);
  };

  const success = (data) => {
    setList(data.data);
    console.log(data.data)
    console.log(list)
    setCount(data.count);
    console.log(data.count)
    console.log(count)
    const newPages = [];
    if (data.count > 10) {
      for (let i=0; i<Math.ceil(data.count / 10); i++) {
        newPages.push({
          name: (i+1).toString(),
          page: i,
        });
        console.log("page",i);
      }
      if (page > newPages.length-1) {
        setPage(page-1);
      }
    } else {
      setPage(0);
    }
    setPages(newPages);
  };

  const logout = async (e)=>{
    await localStorage.setItem("salesToken",null);
    window.location = "/login";
  };

  const home = async (e) => {
    window.location = "/index";
  };

  const getData = ()=>{
    get_workout_api(page, success, (text)=>{console.log("Error: ", text)});
  };

  const newOrder = ()=>{
    setModalDescription("New Workout");
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const editOrder = (data)=>{
    setModalDescription("New order");
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const saveOrder = (e) => {
    e.preventDefault();
    setError("");
  
    if (rowingType === "single_distance") {
      if (split_length * distance_meters === 0) {
        setError("Please enter split length and distance");
        return;
      } else {
        post_workout_api(
          // { split_length, distance_meters, date, workoutTime },
          { split_length, distance_meters, date, workoutTime, workoutType, rowingType},
          () => {
            getData();
          }
        );
        setShowModal(false);
      }
    } else if (rowingType === "single_time") {
      if (
        (time_minutes + time_seconds) * (split_length_minutes + split_length_seconds) ===
        0
      ) {
        setError("Please enter split length and time");
        return;
      } else {
        post_workout_api(
          {
            time_minutes,
            time_seconds,
            split_length_minutes,
            split_length_seconds,
            date,
            workoutTime,
            workoutType,
          },
          () => {
            getData();
          }
        );
        setShowModal(false);
      }
    } else if (rowingType === "intervals") {
      if (distanceInt + Int_time_minutes + Int_time_sec +Rest_time_minutes + rest_time_sec === 0) {
        setError("Please fill out all fields");
        return;
      } else {
        post_workout_api(
          {
            distanceInt,
            Int_time_minutes,
            Int_time_sec,
            Rest_time_minutes,
            rest_time_sec,
            num_intervals,
            date,
            workoutTime,
            workoutType,
          },
          () => {
            getData();
          }
        );
        setShowModal(false);
      }
    } else {
      if (Id === null)
        post_workout_api({ date, workoutTime, rowingType }, () => {
          getData();
        });
      else
        put_workout_api(Id, { date, workoutTime, rowingType }, () => {
          getData();
        });
      setShowModal(false);
    }
  };
  
  const deleteOrder = (orderId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        delete_workout_api(orderId, ()=>{
          Swal.fire({
              title: 'Deleted!',
              text: "Your order has been deleted!",
              icon: 'success',
              timer: 1000
          });
          getData();
        });
      }
    });
  };
  

  const keyDownHandler = (e)=>{
    if (e.which === 27)
      setShowModal(false);
  };

  React.useEffect(()=>{
    getData();
  }, [page]);
  function WorkoutTable(props) {
    return (
      <table className="table table-hover caption-top">
          <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Workout Time</th>
            <th>Workout Type</th>
            <th>Intervals</th>
            <th>Distance (m)</th>
            <th>Rest Time (mm:ss)</th>
          </tr>
        </thead>
        <tbody>
          {props.workouts.map((workout) => (
            <tr key={workout.id}>
              <td>{workout.date}</td>
              <td>{workout.workoutTime}</td>
              <td>{workout.workoutType}</td>
              <td>{workout.num_intervals}</td>
              <td>{workout.distance_meters}</td>
              <td>{`${workout.rest_time_minutes}:${workout.rest_time_sec}`}</td>
              <td>
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={()=>{editOrder(workout)}}>Edit</a>{" "}
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={()=>{deleteOrder(workout.id)}}>Delete</a>
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    );
  }


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
              <i className="fas fa-gem"></i>WorkoutTrak : Room 4
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
                  <h1> Room 1 </h1>
                  <p> Group Owner: </p>
                  <input type="text" className="input" value={firstName} onChange={handleFirstNameChange}></input>
                  <p> Organization: </p>
                  <input type="text" className="input" value={lastName} onChange={handleLastNameChange}></input>
                  <p> Details: </p>
                  <input type="text" className="input" value={gender} onChange={handleGenderChange}></input>
                </form>
                <button className="main__btn"><a href="/social2X">Return to Rooms</a></button>
            </div>
            <div className="main__img--container">
               <img src="static/images/pic3.svg" alt="pic" id="main__img" />
             </div>
          </div>
      </div>


         
          <div className="services">
            <h1>-</h1>
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