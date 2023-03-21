'use strict';
const e = React.createElement;

function App() {
  const [list, setList] = React.useState([]);
  const [pages, setPages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalDescription, setModalDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [item, setItem] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = React.useState("");
  const [type, setType] = React.useState("");
  const [reps, setReps] = React.useState(0);
  const [meters, setMeters] = React.useState(0);
  const [TimeMin, setTimeMin] = React.useState("");
  const [TimeSec, setTimeSec] = React.useState("");
  const [RestMin, setRestMin] = React.useState("");
  const [RestSec, setRestSec] = React.useState("");
  const [CoolMeters, setCoolMeters] = React.useState("");
  const [WarmMeters, setWarmMeters] = React.useState("");


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

  const getData = ()=>{
    get_orders_api(page, success, (text)=>{console.log("Error: ", text)});
  };

  const newOrder = ()=>{
    setModalDescription("New Workout");
    setdate(null);
    setTime("");
    setType("");
    setReps(0);
    setMeters(0);
    setTimeMin("");
    setTimeSec("");
    setRestMin("");
    setRestSec("");
    setCoolMeters("");
    setWarmMeters("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const editOrder = (data)=>{
    setModalDescription("New order");
    setdate(data.date);
    setTime(data.time);
    setType(data.type);
    setReps(data.reps);
    setMeters(data.meters);
    setTimeMin(data.timeMin);
    setTimeSec(data.timeSec);
    setRestMin(data.RestMin);
    setRestSec(data.RestSec);
    setCoolMeters(data.coolMeters);
    setWarmMeters(data.warmMeters);
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };

  const saveOrder = (e)=>{
    e.preventDefault();
    setError("");
    console.log("saving new", item, price, quantity);
    if (item.length * price * quantity === 0)
      setError("Please enter item name, price and quantity");
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
                  <div class="container">
                    <h1>Workout Tracker</h1>
                      <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="date" className="form-control" name="date" required
                          value={date} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="time">Time:</label>
                        <select id="time" name="time">
                          <option value="am">AM</option>
                          <option value="pm">PM</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="type">Workout Type:</label>
                        <select id="type" name="type">
                          <option value="steady-state">Steady State</option>
                          <option value="at">AT</option>
                          <option value="race-pace">Race Pace</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="repetitions">Repetitions:</label>
                        <input type="number" id="repetitions" name="repetitions" required
                          value={reps} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="meters">Meters:</label>
                        <input type="number" id="meters" name="meters"
                          value={meters} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="time-minutes">Time (Minutes):</label>
                        <input type="number" id="time-minutes" name="time-minutes"
                          value={TimeMin} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="time-seconds">Time (Seconds):</label>
                        <input type="number" id="time-seconds" name="time-seconds"
                        value={TimeSec} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="rest-minutes">Rest (Minutes):</label>
                        <input type="number" id="rest-minutes" name="rest-minutes"
                        value={RestMin} onChange={(e)=>{setItem(e.target.value)}}/>
                      </div>
                      <div class="form-group">
                        <label for="rest-seconds">Rest (Seconds):</label>
                        <input type="number" id="rest-seconds" name="rest-seconds"
                        value={RestSec} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="cool-down">Cool Down (Meters):</label>
                        <input type="number" id="cool-down" name="cool-down"
                        value={CoolMeters} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <label for="warm-up">Warm Up (Meters):</label>
                        <input type="number" id="warm-up" name="warm-up"
                        value={WarmMeters} onChange={(e)=>{setItem(e.target.value)}}
                        />
                      </div>
                      <div class="form-group">
                        <button type="submit">Submit</button>
                      </div>
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
            <th>Time</th>
            <th>Workout Type</th>
            <th>Repetitions</th>
            <th>Meters</th>
            <th>Time(minutes)</th>
            <th>time(seconds)</th>
            <th>rest(minutes)</th>
            <th>rest(seconds)</th>
            <th>Cooldown(meters)</th>
            <th>WarmUp(meters)</th>
            {/* <th>Average Rate</th> */}

          </tr>
          </thead>
          <tbody>
          { list.map((row)=>
            <tr key={row.id}>
              <td>{row.date}</td> 
              <td>{row.time}</td>
              <td>{row.type}</td>
              <td>{row.reps}</td>
              <td>{row.meters}</td>
              <td>{row.timeMin}</td>
              <td>{row.timeSec}</td>
              <td>{row.RestMin}</td>
              <td>{row.RestSec}</td>
              <td>{row.CoolMeters}</td>
              <td>{row.WarmMeters}</td>
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
