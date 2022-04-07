import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-unresolved
import { Icon } from '@iconify/react';

import './homeAppHeader.scss';

function HomeAppHeader() {
  return (
    <header className="homeApp-header">
      <div className="homeApp-header_notify">
        <Link to="Foo">
          <Icon
            icon="clarity:notification-outline-badged"
            color="black"
          // color="red"
            width="30"
            height="30"
          />
        </Link>
      </div>
      <div className="homeApp-header_title">
        <h1>Majordome</h1>
      </div>
      <div className="homeApp-header_avatar">
        <Link to="/Profile">
          <Icon
            icon="carbon:user-avatar-filled-alt"
            color="black"
            width="40"
            height="40"
          />
        </Link>
      </div>
    </header>
  );
}

export default HomeAppHeader;
