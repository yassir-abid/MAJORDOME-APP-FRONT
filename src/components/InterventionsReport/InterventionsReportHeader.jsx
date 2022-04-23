import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

import './interventionsReport.scss';

function InterventionsReportHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

  return (
    <header className="interventionsReport-header">
      <div className="interventionsReport-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="interventionsReport-header_title">
        <h1>Nom intervention </h1>
      </div>

      <div className="interventionsReport-header_avatar">
        <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </div>
    </header>
  );
}

export default InterventionsReportHeader;
