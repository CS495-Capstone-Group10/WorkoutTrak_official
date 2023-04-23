

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
              <i className="fas fa-gem"></i>WorkoutTrak : Room Menu
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
              <h1>Room Menu</h1>
              <p>Join a group!</p>
            </div>
            <div className="main__content">
              <h1>Workout Categories</h1>
              <button className="main__btn"><a href="/room1X">Room1</a></button>
              <button className="main__btn"><a href="/room2X">Room2</a></button>
              <button className="main__btn"><a href="/room3X">Room3</a></button>
              <button className="main__btn"><a href="/room4X">Room5</a></button>
              <button className="main__btn"><a href="/room5X">Room6</a></button>
            </div>
          </div>

        </div>


         
          <div className="services">
          <h1>-</h1>
           
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