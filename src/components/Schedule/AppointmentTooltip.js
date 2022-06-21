/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { formatDate } from 'devextreme/localization';

export default function AppointmentTooltip(model) {
  const data = model.data.targetedAppointmentData;
  return (
    <div className="movie-tooltip">
      <div className="movie-info">
        <div className="movie-title">
          {data.title}
        </div>
        <div>
          Client: {data.client.lastname} {data.client.firstname}
        </div>
        <div>
          {formatDate(data.displayStartDate, 'shortDateShortTime')}
        </div>
        <div>
          {formatDate(data.displayEndDate, 'shortDateShortTime')}
        </div>
      </div>
    </div>
  );
}
