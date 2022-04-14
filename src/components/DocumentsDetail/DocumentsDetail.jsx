/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import DocumentsDetailHeader from './DocumentsDetailHeader';
import './documentsDetail.scss';

function DocumentsDetail() {
  return (
    <div className="documentsDetail">
      <DocumentsDetailHeader />
      <div className="documentsDetail">
        <div className="documentsDetail-main">
          <p>Nom du projet</p>
        </div>
      </div>
    </div>
  );
}

export default DocumentsDetail;
