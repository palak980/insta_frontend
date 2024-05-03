import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './personalspace.css';

function PersonalSpace() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [shareFormVisible, setShareFormVisible] = useState(false); // State to control share form visibility
  const [emailList, setEmailList] = useState(''); // State to store email addresses
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/space/uploads/');
      setImages(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:8000/space/uploads/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchData();
      setTitle('');
      setImage(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://127.0.0.1:8000/space/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };

    try {
      await axios.delete(`http://127.0.0.1:8000/space/uploads/${imageId}/`, config);
      fetchData();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleShare = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };

    const formData = new FormData();
    formData.append('emails', emailList);

    try {
      await axios.post('http://127.0.0.1:8000/space/shared-uploads/', formData, config);
      // After sharing, you may want to reset the email list and hide the form
      setEmailList('');
      setShareFormVisible(false);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleShareForm = () => {
    setShareFormVisible(!shareFormVisible);
  };

  const handleEmailChange = (e) => {
    setEmailList(e.target.value);
  };

  return (
    <div>
      <header>
        <button onClick={() => setShowForm(!showForm)}>Upload Image</button>
        <button onClick={handleLogout}>Logout</button>
      </header>
      {showForm && (
        <div className="upload-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label>Image:</label>
              <input type="file" onChange={handleFileChange} required />
            </div>
            <button type="submit">Upload</button>
          </form>
        </div>
      )}
      <div className="dashboard-container">
        <div className="files-list">
          <h2>Uploaded Images</h2>
          <ul>
            {images.map((item) => (
              <li key={item.id}>
                <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.image} />
                <span>{item.title}</span>
                <p>{item.created_at}</p>
                <button onClick={() => handleDeleteImage(item.id)}>Delete</button>
                <button onClick={toggleShareForm}>Share</button>
                {shareFormVisible && (
                  <div>
                    <input type="text" value={emailList} onChange={handleEmailChange} placeholder="Enter email addresses" />
                    <button onClick={handleShare}>Send</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PersonalSpace;
