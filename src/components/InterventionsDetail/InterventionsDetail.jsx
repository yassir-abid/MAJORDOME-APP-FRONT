/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import InterventionsDetailHeader from './InterventionsDetailHeader';
import './interventionsDetail.scss';

function InterventionsDetail() {
  return (
    <div className="interventionsDetail">
      <InterventionsDetailHeader />
    </div>
  );
}

export default InterventionsDetail;
