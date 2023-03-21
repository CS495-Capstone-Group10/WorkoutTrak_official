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


  // added this function to be called to pull up athletes page
  const athletes = async (e)=>{
    // this await thing may be causing issues with the login popups being forced
    //await localStorage.setItem("salesToken",null);
    window.location = "/athletes";
  };

  const workouts = async (e)=>{
    // this await thing may be causing issues with the login popups being forced
    //await localStorage.setItem("salesToken",null);
    window.location = "/workouts";
  };

  const upDoc = async (e)=>{
    //await localStorage.setItem("salesToken",null);
    window.location = "/upDoc";
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
        <div style={{display: "flex", flexDirection: "row"}}>
          <span>WorkoutTrak: Home</span>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={logout}>Logout</a>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={upDoc}>Upload Document</a>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={workouts}>Workouts</a>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={athletes}>Athletes</a>
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
            <th>Workout</th>
            <th>Date</th>
            <th>Athlete</th>
            <th>Average Split</th>
            <th>Average Rate</th>
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
              {/* average rate */}
              <td>{row.quantity}</td>
              {/* <td>{row.amount}</td> */}
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

//<a className="btn btn-light" style={{marginLeft: "auto"}} onClick={logout}>Logout</a>

//<a className="btn btn-light" style={{marginLeft: "auto"}} onClick={athletes}>Athletes</a>