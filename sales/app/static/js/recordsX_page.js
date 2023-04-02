

'use strict';
const e = React.createElement;




function MyComponent() {

    
  const logout = async (e)=>{
    await localStorage.setItem("salesToken",null);
    window.location = "/login";
  };


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
             <div className="main__img--container">
               <img src="static/images/DataATemp1.png" alt="pic" id="main__img" />
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