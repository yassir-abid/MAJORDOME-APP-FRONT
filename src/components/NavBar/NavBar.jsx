import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import './style.scss';

function NavBar() {
  return (
    <nav className="homeApp-nav">
      <div className="homeApp-nav_secondary">
        <button type="button" className="btn">
          <Icon
            icon="wpf:todo-list"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="icon-park-outline:user-business"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="fluent:channel-alert-24-regular"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="bx:traffic-cone"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="fe:document"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
      </div>
      <div className="homeApp-nav_primary">
        <button type="button" className="btn">
          <Icon
            icon="ant-design:home-outlined"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="akar-icons:person-add"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="charm:menu-hamburger"
            color="#009285"
            width="45"
            height="45"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="bi:calendar-date"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
        <button type="button" className="btn">
          <Icon
            icon="codicon:tools"
            color="#009285"
            width="32"
            height="32"
          />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
