import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './homeAppHeader.scss';

function HomeAppHeader() {
  return (
    <header className="homeApp-header">
      <div className="homeApp-header_notify">
        <Icon
          icon="clarity:notification-outline-badged"
          color="black"
          // color="red"
          width="30"
          height="30"
        />
      </div>
      <div className="homeApp-header_title">
        <h1>Majordome</h1>
      </div>
      <div className="homeApp-header_avatar">
        <Icon
          icon="carbon:user-avatar-filled-alt"
          color="black"
          width="40"
          height="40"
        />
      </div>
    </header>
  );
}

export default HomeAppHeader;
