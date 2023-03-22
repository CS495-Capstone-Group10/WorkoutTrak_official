'use strict';
const e = React.createElement;

function App() {
  const [list, setList] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [pages, setPages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalDescription, setModalDescription] = React.useState("");
  const [itemId, setItemId] = React.useState(null);
  const [error, setError] = React.useState("");
  const [item, setItem] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
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
  const [workoutType, setWorkoutType] = React.useState('single_distance');
  const [intervalVariableType, setIntervalVariableType] = React.useState('distance');
  const [workoutData, setWorkoutData] = React.useState(null);
  const [workoutTime, setWorkoutTime] = React.useState('single_distance');

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };
  const handleWorkoutTimeChange = (event) => {
    setWorkoutTime(event.target.value);
  };
  const HandlesetIntervalVariableType = (event) => {
    setIntervalVariableType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setWorkoutData(data);
    console.log(data);
  };

  const success = (data) => {
    setList(data.data);
    setCount(data.count);
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
    get_orders_api(page, success, (text)=>{console.log("Error: ", text)});
  };

  const newOrder = ()=>{
    setModalDescription("New Workout");
    setItemId(null);
    setItem("");
    setPrice(0);
    setQuantity(0);
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const editOrder = (data)=>{
    setModalDescription("New order");
    setItemId(data.id);
    setItem(data.item);
    setPrice(data.price);
    setQuantity(data.quantity);
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const saveOrder = (e)=>{
    e.preventDefault();
    setError("");
    console.log("saving new", item, price, quantity);
    if (workoutType=== "single_distance"){
      if(split_length * distance_meters === 0){
        setError("Please enter split length and distance");
      }
      else{
        post_order_api({split_length, distance_meters, date, workoutTime}, ()=>{getData();});
      }
    }
    else if ((workoutType=== "single_time")){
      if((time_minutes+time_seconds)*(split_length_minutes+split_length_seconds)===0)
      setError("Please enter split length and time");
    }
    else if((workoutType=== "intervals")){
    }
    else {
      if (itemId === null)
        post_order_api({item, price, quantity}, ()=>{getData();});
      else
        put_order_api(itemId, {item, price, quantity}, ()=>{getData();});
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
        delete_order_api(orderId, ()=>{
          Swal.fire({
              title: 'Deleted!',
              text: "Your order has been deleted!",
              icon: 'success',
              timer: 1000,
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
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
              <label htmlFor="interval_type">Select Workout Type:</label>
        <select id="interval_type" name="interval_type" value={workoutType} onChange={handleWorkoutTypeChange}>
          <option value="single_distance">Single Distance</option>
          <option value="single_time">Single Time</option>
          <option value="intervals">Intervals</option>
        </select>
        {workoutType === 'single_distance' && (
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
        {workoutType === 'single_time' && (
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
        {workoutType === 'intervals' && (
  <div>
    <label htmlFor="interval_variable_type">Interval Type:</label>
    <select id="interval_variable_type" name="interval_variable_type" value={intervalVariableType} onChange={HandlesetIntervalVariableType}>
      <option value="distance">Distance (meters)</option>
      <option value="time">Time (minutes:seconds)</option>
    </select><br/>
    <label htmlFor="num_intervals">Number of Intervals:</label><br/>
    <input type="number" id="num_intervals" name="num_intervals" 
        value={num_intervals} onChange={(e)=>{set_num_intervals(e.target.value)}}
        placeholder="0"/><br />
    {intervalVariableType === 'distance' && (
      <div>
        <label htmlFor="distanceInt">distance (meters):</label>
        <input type="number" id="distanceInt" name="distanceInt" 
            value={distanceInt} onChange={(e)=>{setdistanceInt(e.target.value)}}
            placeholder="0"/><br />
      </div>
    )}
    {intervalVariableType === 'time' && (
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

      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em",
                    padding: "1em"}} className="shadow">
        <div style={{display: "flex", flexDirection: "row"}}>
          <span>University Alabama Rowing Data</span>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={logout}>Logout</a>

          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={home}>Home</a>
        </div>
      </div>
      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em",
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
          <a className="btn btn-light" style={{marginLeft: "auto"}}
             onClick={newOrder}
          >New Workout</a>
        </div>
        <table className="table table-hover caption-top">
          <thead className="table-light">
          <tr>

            <th>Date</th>
            <th>Am/PM</th>
            <th>Reps</th>
            <th>Distance</th>
            <th>excel Link</th>
            <th>Whole team?</th>

          </tr>
          </thead>
          <tbody>
          { list.map((row)=>
            <tr key={row.id}>

              {/* workout */}
              <td>{row.id}</td> 
              {/* date */}
              <td>{row.date}</td>
              {/* athlete */}
              <td>{row.item}</td>
              {/* average split */}
              <td>{row.price}</td>
              <td>{row.item}</td>
              <td>{row.item}</td>
              {/* Type */}
              <td>
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{editOrder(row)}}>Edit</a>{" "}
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{deleteOrder(row.id)}}>Delete</a>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(App),
  domContainer
);
