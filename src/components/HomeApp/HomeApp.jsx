import React from 'react';
import HomeAppHeader from './HomeAppHeader';
import './style.scss';

function HomeApp() {
  return (
    <div className="homeApp">
      <HomeAppHeader />
      <main className="homeApp-main">
        <h2>
          *date du jour*
        </h2>
        <h3>
          feuille de route
        </h3>
        <div className="homeApp-container_list">
          <ul>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
            <li className="homeApp-main_li">
              <p>nom de lintervention</p>
              <p>nom du client</p>
              <p>heure</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default HomeApp;
