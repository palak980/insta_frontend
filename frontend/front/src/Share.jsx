import React, { useState } from 'react';
import axios from 'axios';

function Share() {
  const [formData, setFormData] = useState({
    fileId: '',
    users: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/space/shared-uploads/', formData);
      // Handle successful share
    } catch (error) {
      // Handle share error
      console.error('Error sharing file:', error);
    }
  };

  return (
    <div>
      <h2>Share</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fileId" placeholder="File ID" value={formData.fileId} onChange={handleChange} />
        <input type="text" name="users" placeholder="Users to share with" value={formData.users} onChange={handleChange} />
        <button type="submit">Share</button>
      </form>
    </div>
  );
}

export default Share;