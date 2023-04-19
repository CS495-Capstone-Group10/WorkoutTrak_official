// newer file

'use strict';
const e = React.createElement;
//import React, { useState } from 'react';
//import axios from 'axios';


function UploadDocument() {
    // holds title, file, and description
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = userState(null);

    const logout = async (e)=>{
        await localStorage.setItem("salesToken",null);
        window.location = "/login";
      };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // creates data to be sent to server
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        // sends data to django view in upDocuments.py
        await axios.post('/api/upload_document/', formData); //************************************ */
    }

    return ( 
        // website upload page details 
        <div>
        <nav className="navbar">
          <div className="navbar__container">
            <a href="/homeX" id="navbar__logo">
              <i className="fas fa-gem"></i>WorkoutTrak : Social
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
  
   
         
          <div className="services">
          <h1>-</h1>
           <div className="services__container">
            
             <div className="services__card1">
               <h2>Form a Group</h2>
               <button className="main__content"><a href="/socialX">Create Group</a></button>
             </div>
             <div className="services__card1">
               <h2>Join a Group</h2>
               <button className="main__content"><a href="/socialX">Join Group</a></button>
             </div>
           </div>
         </div> 
  
         <script type="text/jsx" src="/static/js/app2.js"></script> 
      </div>
    );
}

// very experimental
// trying to fix the issue with the page not loading
const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
    e(UploadDocument),
    domContainer
);


// unsure whether to keep
//export default UploadDocument;