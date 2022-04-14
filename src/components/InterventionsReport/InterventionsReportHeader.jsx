import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import './interventionsReport.scss';

function InterventionsReportHeader() {
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

export default InterventionsReportHeader;
