import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

import './style.scss';

function NavBar() {
  return (
    <nav className="homeApp-nav">
      {/* secondary NavBar */}
      <div className="homeApp-nav_secondary">
        {/* btn todolist */}
        <NavLink to="/todolist">
          <button type="button" className="btn">
            <Icon
              icon="wpf:todo-list"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn suppliers */}
        <NavLink to="/suppliers">
          <button type="button" className="btn">
            <Icon
              icon="icon-park-outline:user-business"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn notify */}
        <NavLink to="/notifications">
          <button type="button" className="btn">
            <Icon
              icon="fluent:channel-alert-24-regular"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn projects */}
        <NavLink to="/projects">
          <button type="button" className="btn">
            <Icon
              icon="bx:traffic-cone"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn documents */}
        <NavLink to="/documents">
          <button type="button" className="btn">
            <Icon
              icon="fe:document"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
      </div>
      {/* principal NavBar */}
      <div className="homeApp-nav_primary">
        {/* btn Home */}
        <NavLink to="/home-app">
          <button type="button" className="btn">
            <Icon
              icon="ant-design:home-outlined"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn Clients */}
        <NavLink to="/clients">
          <button type="button" className="btn">
            <Icon
              icon="akar-icons:person-add"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn menu */}
        <button type="button" className="btn">
          <Icon
            icon="charm:menu-hamburger"
            color="#009285"
            width="45"
            height="45"
          />
        </button>
        {/* btn schedule */}
        <NavLink to="/schedule">
          <button type="button" className="btn">
            <Icon
              icon="bi:calendar-date"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
        {/* btn interventions */}
        <NavLink to="/interventions">
          <button type="button" className="btn">
            <Icon
              icon="codicon:tools"
              color="#009285"
              width="32"
              height="32"
            />
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
