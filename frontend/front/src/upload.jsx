import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await axios.post('http://localhost:8000/api/uploads/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle successful upload
      console.log('Upload successful', response.data);
    } catch (error) {
      // Handle upload error
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;