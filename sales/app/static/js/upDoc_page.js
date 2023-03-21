// newer file


import React, { useState } from 'react';
import axios from 'axios';


function UploadDocument() {
    // holds title, file, and description
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = userState(null);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // creates data to be sent to server
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        // sends data to django view in upDocuments.py
        await axios.post('/api/upload_document/', formData);
    }

    return ( 
        // website upload page details 
        <div>
            <h1> Upload Document</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description"></label>
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="file">File:</label>
                    <input type = "file" onChange = {(e) => setFile(e.target.files[0])} />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

// unsure whether to keep
//export default UploadDocument;