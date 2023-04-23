'use strict';
const e = React.createElement;

function MyComponent() {
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

  const logout = async (e)=>{
    await localStorage.setItem("salesToken",null);
    window.location = "/login";
  };

  return (
    <div>
      <nav className="navbar">
          <div className="navbar__container">
            <a href="/homeX" id="navbar__logo">
              <i className="fas fa-gem"></i>WorkoutTrak : Profile
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
          
            
                <form onSubmit={handleSubmit}>
                  <h1> Personal Info</h1>
                  <h2> First Name </h2>
                  <input type="text" className="input" value={firstName} onChange={handleFirstNameChange}></input>
                  <h2> Last Name </h2>
                  <input type="text" className="input" value={lastName} onChange={handleLastNameChange}></input>
                  <h2> Gender </h2>
                  <input type="text" className="input" value={gender} onChange={handleGenderChange}></input>
                  <h2> Email </h2>
                  <input type="text" className="input" value={email} onChange={handleEmailChange}></input>
                  <h2> Occupation </h2>
                  <input type="text" className="input" value={occupation} onChange={handleOccupationChange}></input>
                  <button type="submit">Save</button>
                </form>
              
          
        </div>
      </div>


      <div className="services">
           
         </div> 



      <script type="text/jsx" src="/static/js/app2.js"></script>
    </div>
  );
}

const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(e(MyComponent), domContainer);
