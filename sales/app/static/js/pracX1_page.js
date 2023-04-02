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

  const tryLogin = async (e) => {
    e.preventDefault();
    console.log("Loggin in with", username, password);
    await login_api(username, password, success, (text)=>{setMessage(text)});
  };

  const goToCreateAccount = () => {
    // window.location = "/create-account";
    window.location = "/create-account";
  }
  const goToForgetPassword = () => {
    window.location = "/forgot-password";
  }

  return (
      <div style={{width: "400px", margin: "auto", marginTop: "200px",
        boxShadow: "5px 5px 20px #cccccccc",
        padding: "1em"
                }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input autoFocus type="text" className="form-control" id="username" placeholder="Enter your username"
              onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password"
              onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          </div>
          <div style={{margin: "1em", color: "red"}}>{message}</div>
          <button type="submit" className="btn btn-primary" onClick={tryLogin}>Login</button>
        </form>
        <button type="button" className="btn btn-thirdary" onClick={goToForgetPassword}>Forgot your password?</button>
        <button type="button" className="btn btn-secondary" onClick={goToCreateAccount}>Create your account</button>
      </div>
  );

  
}

// const domContainer = document.querySelector('#reactAppContainer');
// ReactDOM.render(
//   e(App),
//   domContainer
// );



// import React from 'react';
// import '.static/css/styleX1.css';

function MyComponent1() {
    return (
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <button type="submit" className="btn btn-primary" onClick={tryLogin}>Login</button>
            <input autoFocus type="text" className="form-control" id="username" placeholder="Enter your username"
              onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
          </div>
    );
}



function MyComponent() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__container">
          <a href="/" id="navbar__logo">
            <i className="fas fa-gem"></i>WorkoutTrak
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
              <a href="/loginX" className="navbar__links">Logout</a>
            </li>
            <li className="navbar__item">
              <a href="/loginX" className="navbar__links">Login</a>
            </li>
            <li className="navbar__btn">
              <a href="/createAccountX" className="button">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav> 

 
      
        <div className="main">
         <div className="main__container">
           <div className="main__content">
             <h1>WorkoutTrak</h1>
             <p>Create an Account</p>
             <button className="main__btn"><a href="/createAccountX">Sign Up</a></button>
           </div>
           <div className="main__img--container">
             <img src="static/images/pic1.svg" alt="pic" id="main__img" />
           </div>
         </div>
       </div>

       
      
        <div className="services">
         <h1>More Features</h1>
         <div className="services__container">
           <div className="services__card">
             <h2>Form a Group</h2>
             <button>Social</button>
           </div>
           <div className="services__card">
             <h2>Design a Workout</h2>
             <button>Workouts</button>
           </div>
         </div>
       </div> 

       <script type="text/jsx" src="/static/js/app2.js"></script> 
    </div>
  );
}

//export default MyComponent;
//export default MyComponent1;
const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(MyComponent),
  domContainer
);