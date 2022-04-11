import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './projectDetailsHeader.scss';

function ProjectDetailsHeader() {
  return (
    <header className="projects__details__header">
      <div className="projects__details__notify">
        <Link to="Foo">
          <Icon icon="fe:search" width="30" />
        </Link>
      </div>
      <div className="projects__details__header_title">
        <h1>Nom du projet</h1>
      </div>
      <div className="projects__details__header_notifications">
        <Icon icon="emojione-v1:red-circle" width="13" />
      </div>
      <div className="projects__details__header_avatar">
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

export default ProjectDetailsHeader;
