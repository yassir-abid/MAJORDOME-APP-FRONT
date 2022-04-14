import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './documentsDetail.scss';

function DocumentsDetailHeader() {
  return (
    <header className="documentsDetail-header">
      <div className="documentsDetail-header_notify">
        <Icon
          icon="charm:search"
          color="black"
          width="30"
          height="30"
        />
      </div>
      <div className="documentsDetail-header_title">
        <h1>Documents</h1>
      </div>

      <div className="documentsDetail-header_avatar">
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

export default DocumentsDetailHeader;
