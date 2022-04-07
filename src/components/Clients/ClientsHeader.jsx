import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './clients.scss';

function ClientsHeader() {
  return (
    <header className="clients-header">
      <div className="clients-header_notify">
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
      <div className="clients-header_title">
        <h1>Clients</h1>
      </div>
      <div className="clients-header_avatar">
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

export default ClientsHeader;
