import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './documents.scss';

function DocumentsHeader() {
  return (
    <header className="documents-header">
      <div className="documents-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="documents-header_title">
        <h1>Documents</h1>
      </div>

      <div className="documents-header_avatar">
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

export default DocumentsHeader;
