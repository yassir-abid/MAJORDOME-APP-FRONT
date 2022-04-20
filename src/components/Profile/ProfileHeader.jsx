import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';

import './profilStyle.scss';

function HomeAppHeader() {
  const [avatar, setAvatar] = useState('/static/images/avatar/1.jpg');
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState('');

  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/profile', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
      if (response.data.picture) {
        setAvatar(response.data.picture);
      }
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  console.log(avatar);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios({
        method: 'patch',
        url: 'https://majordome-api.herokuapp.com/api/profile/avatar',
        data: formData,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.picture);
      setAvatar(response.data.picture);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAvatar = ({ currentTarget }) => {
    const tempAvatar = currentTarget.files[0];
    if (tempAvatar) {
      setSelectedFile(tempAvatar);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="profile-header">
      <div className="profile-header_avatar">
        <div>
          <label htmlFor="image_up">
            <form onSubmit={handleSubmit}>
              <input
                className="input-avatar"
                id="image_up"
                type="file"
                accept=".jpg, .jpeg, .png"
                name="image_up"
                onChange={handleChangeAvatar}
              />
              <input
                // className="input-avatar"
                type="submit"
                value={selectedFile}
              />
            </form>
            <Avatar avatar={avatar} firstname={data.firstname} />
          </label>
        </div>
      </div>
      <div className="profile-header_title">
        <h1>{data.firstname} {data.lastname}</h1>
      </div>
    </header>

  );
}

export default HomeAppHeader;
