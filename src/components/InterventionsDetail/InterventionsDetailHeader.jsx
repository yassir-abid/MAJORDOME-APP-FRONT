import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

import './interventionsDetail.scss';

function InterventionsDetailHeader({ nameIntervention }) {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

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
        <h1> {nameIntervention}</h1>
      </div>

      <div className="interventionsDetail-header_avatar">
        <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </div>
    </header>
  );
}

InterventionsDetailHeader.propTypes = {
  nameIntervention: PropTypes.string.isRequired,
};

export default InterventionsDetailHeader;
