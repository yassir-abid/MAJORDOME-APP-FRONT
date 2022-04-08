import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import Avatar from '../Avatar/Avatar';

import './clients.scss';

function ClientsHeader() {
  return (
    <header className="clients-header">
      <div className="clients-header_notify">
        <Link to="Foo">
          <Icon
            icon="charm:search"
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
          <Avatar />
        </Link>
      </div>
    </header>
  );
}

export default ClientsHeader;
