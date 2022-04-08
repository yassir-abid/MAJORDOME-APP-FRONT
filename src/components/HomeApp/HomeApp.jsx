import React, { useState, useEffect } from 'react';
import HomeAppHeader from './HomeAppHeader';
import './style.scss';

function HomeApp() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  return (
    <div className="homeApp">
      <HomeAppHeader />
      <main className="homeApp-main">
        <div className="homeApp-date">
          <p className="homeApp-date_day">
            {' '}
            {dateState.toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className="homeApp-date_hour">
            {dateState.toLocaleString('fr-FR', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            })}
          </p>
        </div>
        <h3 className="homeApp-main_road">
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
