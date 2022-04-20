import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';

import './profilStyle.scss';

function HomeAppHeader() {
  const [avatar, setAvatar] = useState('/static/images/avatar/1.jpg');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://majordome-api.herokuapp.com/api/profile/avatar',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAvatar = ({ currentTarget }) => {
    const tempAvatar = currentTarget.files[0];
    if (tempAvatar) {
      setAvatar(URL.createObjectURL(tempAvatar));
    }
  };

  return (
    <header className="profile-header">
      <div className="profile-header_avatar">
        <div>
          <label htmlFor="image_up">
            <form onSubmit={handleSubmit} />
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
              value="file"
            />
            <Avatar avatar={avatar} />
          </label>
        </div>
      </div>
      <div className="profile-header_title">
        <h1>*Your name*</h1>
      </div>
    </header>

  );
}

export default HomeAppHeader;
