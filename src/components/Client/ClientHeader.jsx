import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import Avatar from '../Avatar/Avatar';

import './clientHeader.scss';

function ClientHeader() {
  return (
    <header className="client-header">
      <div className="client-header_avatar">
        <Link to="/Profile">
          <Avatar />
        </Link>
      </div>
      <div className="client-header_title">
        <h1>Fiche client</h1>
      </div>
      <div className="client-header_notify">
        {/* lien vers modal */}
        <Icon icon="gg:more-vertical-o" width="30" height="30" />

      </div>

    </header>
  );
}

export default ClientHeader;
