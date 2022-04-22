import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

import './documentsDetail.scss';

function DocumentsDetailHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');
  return (
    <header className="documentsDetail-header">
      <div className="documentsDetail-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="documentsDetail-header_title">
        <h1>Documents</h1>
      </div>

      <div className="documentsDetail-header_avatar">
        <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </div>
    </header>
  );
}

export default DocumentsDetailHeader;
