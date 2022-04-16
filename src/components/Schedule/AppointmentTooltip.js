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
          Client: {data.client.firstname} {data.client.lastname}
        </div>
        <div>
          Duration: {data.duration.hours} h
        </div>
        <div>
          {formatDate(data.displayStartDate, 'shortTime')}
          {' - '}
          {formatDate(data.displayEndDate, 'shortTime')}
        </div>
      </div>
    </div>
  );
}
