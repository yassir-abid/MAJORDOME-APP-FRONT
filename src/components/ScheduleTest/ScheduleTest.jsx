/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {
  Scheduler,
  View,
  Editing,
  Resource,
} from 'devextreme-react/scheduler';

// import AppointmentTooltip from './AppointmentTooltip.js';

import 'devextreme/dist/css/dx.light.css';
// import './App.css';

function ScheduleTest() {
  return (
    <Scheduler
      id="scheduler"
      adaptivityEnabled
      defaultCurrentView="week"
      onAppointmentFormOpening={this.onAppointmentFormOpening}
    >
      <View
        type="day"
        startDayHour={9}
        endDayHour={22}
      />
      <View
        type="week"
        startDayHour={9}
        endDayHour={22}
      />
      <View type="month" />
      <Editing allowAdding={true} />
      <Resource
        dataSource="titremovie"
        fieldExpr="movieId"
        useColorAsDefault={true}
      />
      <Resource
        dataSource="nom thetatre"
        fieldExpr="theatreId"
      />
    </Scheduler>
  );
}

function onAppointmentFormOpening(e) {
  const { form } = e;
  let movieInfo = getMovieById(e.appointmentData.movieId) || {};
  let { startDate } = e.appointmentData;

  form.option('items', [{
    label: {
      text: 'Movie',
    },
    editorType: 'dxSelectBox',
    dataField: 'movieId',
    editorOptions: {
      items: moviesData,
      displayExpr: 'text',
      valueExpr: 'id',
      onValueChanged(args) {
        movieInfo = getMovieById(args.value);

        form.updateData('director', movieInfo.director);
        form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
      },
    },
  }, {
    label: {
      text: 'Director',
    },
    name: 'director',
    editorType: 'dxTextBox',
    editorOptions: {
      value: movieInfo.director,
      readOnly: true,
    },
  }, {
    dataField: 'startDate',
    editorType: 'dxDateBox',
    editorOptions: {
      width: '100%',
      type: 'datetime',
      onValueChanged(args) {
        startDate = args.value;
        form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
      },
    },
  }, {
    name: 'endDate',
    dataField: 'endDate',
    editorType: 'dxDateBox',
    editorOptions: {
      width: '100%',
      type: 'datetime',
      readOnly: true,
    },
  }, {
    dataField: 'price',
    editorType: 'dxRadioGroup',
    editorOptions: {
      dataSource: [5, 10, 15, 20],
      itemTemplate(itemData) {
        return `$${itemData}`;
      },
    },
  },
  ]);
}

export default ScheduleTest;
