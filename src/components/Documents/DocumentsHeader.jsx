import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

import './documents.scss';

function DocumentsHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

  return (
    <header className="documents-header">
      <div className="documents-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="documents-header_title">
        <h1>Documents</h1>
      </div>

      <div className="documents-header_avatar">
        <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </div>
    </header>
  );
}

export default DocumentsHeader;
