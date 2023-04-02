'use strict';
const e = React.createElement;

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const success = async (text)=> {
    console.log("Yeah! Authenticated!");
    await localStorage.setItem("salesToken", text.access);
    window.location = "/";
  };

  const tryAccountCreation = async (e) => {
    //e.preventDefault();
    console.log("Created Account With", username, password);
    await create_account_api(username, password, success, (text)=>{setMessage(text)});
  };

  const goToLogin = () => {
    window.location = "/login";
  };

  return (
      <div style={{width: "400px", margin: "auto", marginTop: "200px",
        boxShadow: "5px 5px 20px #cccccccc",
        padding: "1em"
                }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input autoFocus type="text" className="form-control" id="username" placeholder="Enter a Username"
              onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter a password"
              onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          </div>
          <div style={{margin: "1em", color: "red"}}>{message}</div>
          <button type="submit" className="btn btn-primary" onClick={tryAccountCreation}>Create Account</button>
          <button type="button" className="btn btn-secondary" onClick={goToLogin}>Login</button>
        </form>
        
      </div>
  ); 
}




function MyComponent() {
    const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const success = async (text)=> {
    console.log("Yeah! Authenticated!");
    await localStorage.setItem("salesToken", text.access);
    window.location = "/loginX";
  };

  const tryAccountCreation = async (e) => {
    //e.preventDefault();
    console.log("Created Account With", username, password);
    await create_account_api(username, password, success, (text)=>{setMessage(text)});
  };

  const goToLogin = () => {
    window.location = "/loginX";
  };

  
    return (
      <div>
        <nav className="navbar">
          <div className="navbar__container">
            <a href="/homeX" id="navbar__logo">
              <i className="fas fa-gem"></i>WorkoutTrak
            </a>
            <div className="navbar__toggle" id="mobile-menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className="navbar__menu">
              <li className="navbar__item">
                <a href="/loginX" className="navbar__links">Login</a>
              </li>
              <li className="navbar__btn">
                <a href="/createAccountX" className="button">Sign Up</a>
              </li>
            </ul>
          </div>
        </nav> 
  
   
        
          <div className="services">
           <div className="services__container">
             

        <div style={{width: "400px", margin: "auto", marginTop: "200px",
                boxShadow: "5px 5px 20px #cccccccc",
                padding: "1em"
                }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input autoFocus type="text" className="form-control" id="username" placeholder="Enter a Username"
              onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter a password"
              onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          </div>
          <div style={{margin: "1em", color: "red"}}>{message}</div>
          <button type="submit" className="btn btn-primary" onClick={tryAccountCreation}>Create Account</button>
          <button type="button" className="btn btn-secondary" onClick={goToLogin}>Return to Login</button>
        </form>
        
      </div>

           </div>
         </div>
  
         <div className="main">
           <div className="main__container">
             
           </div>
         </div> 
  
      </div>
      );
    }

const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(MyComponent),
  domContainer
);