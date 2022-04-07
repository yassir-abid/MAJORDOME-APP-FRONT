import React from 'react';
import ProjectsHeader from './ProjectsHeader';
import './style.scss';

function Projects() {
  return (
    <div className="projects">
      <ProjectsHeader />
      <main className="projects-main">
        <div className="projects-container_list">
          <ul>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="projects-main_li">
              <p>Nom du projet</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Projects;
