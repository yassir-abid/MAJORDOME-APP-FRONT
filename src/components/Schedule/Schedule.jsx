/* eslint-disable no-param-reassign */
import {
  React, useState, useEffect,
} from 'react';
import axios from 'axios';
import Scheduler, { Editing } from 'devextreme-react/scheduler';
import frMessages from 'devextreme/localization/messages/fr.json';
import { locale, loadMessages } from 'devextreme/localization';
import Box from '@mui/material/Box';
import Appointment from './Appointment';
import AppointmentTooltip from './AppointmentTooltip';
import ScheduleHeader from './ScheduleHeader';

import 'devextreme/dist/css/dx.greenmist.compact.css';
import baseUrl from '../../utils';

const currentDate = Date.now();
const views = ['day', 'week', 'month'];

const onAppointmentFormOpening = function onAppointmentFormOpening(e) {
  const { form } = e;
  let infos;
  if (e.appointmentData) {
    infos = e.appointmentData;
  } else {
    infos = {};
  }

  form.option('items', [
    {
      label: {
        text: 'Titre de l\'intervention',
      },
      name: 'title',
      editorType: 'dxTextBox',
      editorOptions: {
        value: infos.title,
        readOnly: true,
      },
    },
    {
      label: {
        text: 'Description',
      },
      name: 'description',
      editorType: 'dxTextBox',
      editorOptions: {
        value: infos.description,
        readOnly: true,
      },
    },
    {
      label: {
        text: 'Client concernée',
      },
      name: 'client',
      editorType: 'dxTextBox',
      editorOptions: {
        value: `${infos.client.lastname} ${infos.client.firstname}`,
        readOnly: true,
      },
    },
    {
      label: {
        text: 'Projet concernée',
      },
      name: 'project',
      editorType: 'dxTextBox',
      editorOptions: {
        value: infos.project.title,
        readOnly: true,
      },
    },
    {
      label: {
        text: 'Addresse',
      },
      name: 'address',
      editorType: 'dxTextBox',
      editorOptions: {
        value: `${infos.address.number} ${infos.address.street} ${infos.address.postal_code}  ${infos.address.city}`,
        readOnly: true,
      },
    },
    {
      dataField: 'Date de début',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        value: infos.startDate,
        readOnly: true,
      },
    },
    {
      dataField: 'Date de fin',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        value: infos.endDate,
        readOnly: true,
      },
    },
    {
      label: {
        text: 'Statut',
      },
      name: 'status',
      editorType: 'dxTextBox',
      editorOptions: {
        value: infos.status,
        readOnly: true,
      },
    },
    {
      label: {
        text: 'Commentaires',
      },
      name: 'comments',
      editorType: 'dxTextBox',
      editorOptions: {
        value: infos.comments,
        readOnly: false,
      },
    },
  ]);
};

function Schedule() {
  const [infos, setInfos] = useState('');
  const token = localStorage.getItem('token');
  const infoSchedule = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interventions`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      response.data.forEach((info) => {
        info.startDate = info.date;
        info.endDate = info.end_date;
      });
      setInfos(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };
  useEffect(() => {
    infoSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  loadMessages(frMessages);
  loadMessages({
    fr: {
      'dxScheduler-allDay': 'Journée',
    },
  });
  locale(navigator.language);

  return (
    <Box
      sx={{
        height: '92vh',
      }}
    >
      <ScheduleHeader />
      <div>
        <Scheduler
          timeZone="Europe/Paris"
          dataSource={infos}
          views={views}
          defaultCurrentView="month"
          defaultCurrentDate={currentDate}
          height={650}
          startDayHour={8}
          appointmentComponent={Appointment}
          appointmentTooltipComponent={AppointmentTooltip}
          onAppointmentFormOpening={onAppointmentFormOpening}
        >
          <Editing
            allowDragging={false}
            allowAdding={false}
          />

        </Scheduler>
      </div>
    </Box>
  );
}

export default Schedule;
