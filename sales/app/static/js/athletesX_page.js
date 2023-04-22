'use strict';
const e = React.createElement;

// Setting up of state variables
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
  const [pr_length_minutes, set_pr_length_minutes] = React.useState(0);
  const [pr_length_sec, set_pr_length_sec] = React.useState(0);
  const [name, setname] = React.useState('athlete');
  const [lastWorkout, setlastWorkout] = React.useState('');
  const [goal_length_minutes, goal_pr_length_minutes] = React.useState(0);
  const [goal_length_sec, goal_pr_length_sec] = React.useState(0);
  const [injured, setInjured] = React.useState('AM');
  const handleInjuredChange = (event) => {
    (event.target.value);
  };


  // Called when the list of orders is brought from server
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

 // added upDoc
  const upDoc = async (e)=>{
    //await localStorage.setItem("salesToken",null);
    window.location = "/upDoc";
  };

  const home = async (e)=>{
    //await localStorage.setItem("salesToken",null);
    window.location = "/index";
  };

  // fetches current page of orders from server
  const getData = ()=>{
    get_Atheletes_api(page, success, (text)=>{console.log("Error: ", text)});
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




    <div>
        <nav className="navbar">
          <div className="navbar__container">
            <a href="/homeX" id="navbar__logo">
              <i className="fas fa-gem"></i>WorkoutTrak : Athletes
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
               <h1>Athletes</h1>
               <p>Workout scheduling</p>
               <button className="main__btn"><a href="/workoutsX">Assign Workouts</a></button>
             </div>
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
              <label>Athlete</label>
                <div className="form-group">
                  <input type="text" className="form-control" name="item" id="itemInput"
                         value={item} onChange={(e)=>{setItem(e.target.value)}}
                         placeholder="Item name"/>
                </div>
              <label style={{marginTop: "1em"}}>Average Split</label>
                <div className="form-group" >
                  <input type="number" className="form-control" placeholder="Price"
                         value={price} onChange={(e)=>{setPrice(e.target.value)}}
                         name="price" />
                </div>
              <label style={{marginTop: "1em"}}>Average Rate</label>
                <div className="form-group">
                  <input type="number" className="form-control"
                         value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}
                         placeholder="Quantity" name="quantity" />
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
          {/* <a className="btn btn-light" style={{marginLeft: "auto"}}
             onClick={newOrder}
          >New Workout</a> */}
        </div>
        <table className="table table-hover caption-top">
          <thead className="table-light">
          <tr>
            <th>Athlete</th>
            <th>6km PR (mm:ss)</th>
            <th>Last Workout</th>
            <th>Goal Split (mm:ss) </th>
            <th>Injured?</th>
          </tr>
          </thead>
          <tbody>
          { list.map((row)=>
            <tr key={row.id}>
              {/* workout */}
              <td>{row.name}</td> 
              {/* date */}
              <td>{`${row.pr_length_minutes}:${row.pr_length_sec}`}</td>
              {/* athlete */}
              <td>{row.lastWorkout}</td>
              {/* average split */}
              <td>{`${row.goal_length_minutes}:${row.goal_length_sec}`}</td>
              {/* average rate */}
              <td>{row.injured}</td>
              {/* <td>{row.amount}</td> */}
              {/* <td>
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{editOrder(row)}}>Edit</a>{" "}
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{deleteOrder(row.id)}}>Delete</a>
              </td> */}
            </tr>
          )}
          </tbody>
        </table>
            </div>
      

             
           </div>
         </div>
  
         
        
          <div className="services">
           
         </div> 
  
         <script type="text/jsx" src="/static/js/app2.js"></script> 
      </div>
</div>






















  );
}




const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(App),
  domContainer
);
