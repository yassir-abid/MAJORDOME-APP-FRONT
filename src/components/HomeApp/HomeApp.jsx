import React, { useState, useEffect } from 'react';
import HomeAppHeader from './HomeAppHeader';

import ListInterventions from './ListInterventions';
import './style.scss';

// const interventions = [
//   {
//     date: new Date(2022, 3, 11),
//   },
//   {
//     date: new Date(2022, 3, 12),
//   },
//   {
//     date: new Date(2022, 3, 10),
//   },
//   {
//     date: new Date(2022, 3, 11),
//   },
//   {
//     date: new Date(2022, 3, 11),
//   },
//   {
//     date: new Date(2022, 3, 11),
//   },
// ];

// const formatDate = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth();
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// };

// => https://stackoverflow.com/questions/11955281/sql-where-datetime-column-equals-todays-date

function HomeApp() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  // const filteredInterventions = interventions.filter((intervention) => {
  //   return formatDate(intervention.date) === formatDate(new Date());
  // });

  // console.log(filteredInterventions);

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
          <ListInterventions />
        </div>
      </main>
    </div>
  );
}

export default HomeApp;
