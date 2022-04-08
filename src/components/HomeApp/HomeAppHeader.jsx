import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import Avatar from '../Avatar/Avatar';

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
          <Avatar />
        </Link>
      </div>
    </header>
  );
}

export default HomeAppHeader;
