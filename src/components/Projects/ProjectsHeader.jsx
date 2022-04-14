import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './projectsHeader.scss';

function ProjectsHeader() {
  return (
    <header className="projects-header">
      <div className="projects-header_notify">
        <Link to="Foo">
          <Icon icon="fe:search" width="30" />
        </Link>
      </div>
      <div className="projects-header_title">
        <h1>Projets</h1>
      </div>
      <div className="projects-header_notifications">
        <Icon icon="emojione-v1:red-circle" width="13" />
      </div>
      <div className="projects-header_avatar">
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

export default ProjectsHeader;
