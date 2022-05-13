/* eslint-disable no-param-reassign */
import {
  React, useState, useEffect, useMemo,
} from 'react';
import axios from 'axios';
import Scheduler, { Resource, Editing } from 'devextreme-react/scheduler';
import frMessages from 'devextreme/localization/messages/fr.json';
import { locale, loadMessages } from 'devextreme/localization';
import Box from '@mui/material/Box';
import Appointment from './Appointment';
import AppointmentTooltip from './AppointmentTooltip';
import ScheduleHeader from './ScheduleHeader';

import 'devextreme/dist/css/dx.greenmist.compact.css';

// import data from './Data.json';
// import ResourceDataAddress from './ResourceDataAddress.json';
// import ResourceDataProject from './ResourceDataProject.json';
// import ResourceDataClient from './ResourceDataClient.json';

// You can create the Form widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

// You can create the Form widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

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
      const response = await axios.get('https://majordome-api.herokuapp.com/api/interventions', {
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
        // FIXME: régler la taille
        height: '100vh',
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

          {/* <Resource
          dataSource={infos.clients}
          fieldExpr="client_id"
          label="Client"
        />

        <Resource
          dataSource={infos.project}
          fieldExpr="project_id"
          label="Projet"
        />
        <Resource
          dataSource={infos.address}
          fieldExpr="address_id"
          label="Adresse"
        /> */}
        </Scheduler>
      </div>
    </Box>
  );
}

export default Schedule;
