import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './interventions.scss';

function InterventionsHeader() {
  return (
    <header className="interventions-header">
      <div className="suppliers-header_notify">
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

      <div className="suppliers-header_avatar">
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

export default InterventionsHeader;
