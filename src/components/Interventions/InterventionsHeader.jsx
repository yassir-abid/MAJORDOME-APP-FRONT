import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

import './interventions.scss';

function InterventionsHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

  return (
    <header className="interventions-header">
      <div className="interventions-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="interventions-header_title">
        <h1>Interventions</h1>
      </div>

      <div className="interventions-header_avatar">
        <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </div>
    </header>
  );
}

export default InterventionsHeader;
