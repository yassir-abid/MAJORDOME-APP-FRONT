/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { formatDate } from 'devextreme/localization';

export default function Appointment(model) {
  const data = model.data.targetedAppointmentData;

  return (
    <div className="showtime-preview">
      <div> {data.title}</div>
      <div>
        {formatDate(data.displayStartDate, 'shortTime')}
        {' - '}
        {formatDate(data.displayEndDate, 'shortTime')}
      </div>
    </div>
  );
}
