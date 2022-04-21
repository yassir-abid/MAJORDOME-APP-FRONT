/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';

import Avatar from '../Avatar/Avatar';

import './homeAppHeader.scss';

function HomeAppHeader() {
  return (
    <header className="homeApp-header">
      <div className="homeApp-header_avatar">
        <Link to="/Profile">
          <Avatar />
        </Link>
      </div>
      <div className="homeApp-header_title">
        <h1>Majordome</h1>
      </div>
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
    </header>
  );
}

export default HomeAppHeader;
