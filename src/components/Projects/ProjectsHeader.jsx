import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import Avatar from '../Avatar/Avatar';

import './projectsHeader.scss';

function ProjectsHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

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
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </div>
    </header>
  );
}

export default ProjectsHeader;
