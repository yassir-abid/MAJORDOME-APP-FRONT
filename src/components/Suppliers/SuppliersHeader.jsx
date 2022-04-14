import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './suppliers.scss';

function SuppliersHeader() {
  return (
    <header className="suppliers-header">
      <div className="suppliers-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="suppliers-header_title">
        <h1>Fournisseurs</h1>
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

export default SuppliersHeader;
