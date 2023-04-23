

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
      <div>
        <nav className="navbar">
          <div className="navbar__container">
            <a href="/homeX" id="navbar__logo">
              <i className="fas fa-gem"></i>WorkoutTrak : Records
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
               <h1>Statistics</h1>
               <button className="main__btn"><a href="/recordsX">Modify Records</a></button>
             </div>
             <div className="main__content">
               
             </div>
             <div className = "main__content">
             <h1>History</h1>
             <button className="main__btn"><a href="/recordsX">View History</a></button>
             </div>
             <div className="main__img--container">
               <img src="static/images/DataATemp2.png" alt="pic" id="main__img" />
             </div>
           </div>
         </div>
  
         
        
          <div className="services">
           <div className="services__container">
           </div>
         </div> 
  
         <script type="text/jsx" src="/static/js/app2.js"></script> 
      </div>
    );
  }



const domContainer = document.querySelector('#reactAppContainer');
    ReactDOM.render(
        e(MyComponent),
    domContainer
);