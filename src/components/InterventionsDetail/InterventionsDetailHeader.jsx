import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import './interventionsDetail.scss';

function InterventionsDetailHeader() {
  return (
    <header className="interventionsDetail-header">
      <div className="interventionsDetail-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="interventions-header_title">
        <h1>Nom intervention </h1>
      </div>

      <div className="interventionsDetail-header_avatar">
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

export default InterventionsDetailHeader;
