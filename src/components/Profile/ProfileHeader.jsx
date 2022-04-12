/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Icon } from '@iconify/react';
import Avatar from './Avatar';
import './profilStyle.scss';

function HomeAppHeader() {
  const [avatar, setAvatar] = useState('/static/images/avatar/1.jpg');

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
            <input
              className="input-avatar"
              id="image_up"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="image_up"
              onChange={handleChangeAvatar}
              // TODO : bloquer la taille de l'import de l'avatar ex :50*50px
              // TODO : passer par gestionnaire de taille ?
              // exemple : https://www.npmjs.com/package/react-avatar-editor
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
