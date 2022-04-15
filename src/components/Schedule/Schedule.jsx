import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import Form from 'devextreme/ui/form';
// import frMessages from 'devextreme/localization/messages/fr.json';
import frMessages from 'devextreme/localization/messages/fr.json';
import { locale, loadMessages } from 'devextreme/localization';
// import './style.scss';
// import 'devextreme/dist/css/dx.greenmist.compact.css';

import {
  SimpleItem,
  GroupItem,
  Label,
} from 'devextreme-react/form';
import data from './Data.json';
import resourcesData from './RessourceData.json';

// You can create the Form widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

// You can create the Form widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

const currentDate = Date.now();
const views = ['day', 'week', 'month', 'agenda'];
// const onAppointmentFormOpening = function onAppointmentFormOpening(e) {
//   // const { form } = e;
//   e.popup.option('showTitle', true);
//   e.popup.option('title', e.appointmentData.text
//     ? e.appointmentData.text
//     : 'Ajout d\'une intervention');

//   const { form } = e;
//   const mainGroupItems = form.itemOption('mainGroup').items;

//   if (!mainGroupItems.find((i) => i.dataField === 'Commentaires')) {
//     mainGroupItems.push({
//       colSpan: 2,
//       label: { text: 'Projet concerné' },
//       editorType: 'dxTextBox',
//       dataField: 'project_id',
//     });
//     form.itemOption('mainGroup', 'items', mainGroupItems);
//   }

//   if (!mainGroupItems.find((i) => i.dataField === 'project_id')) {
//     mainGroupItems.push({
//       colSpan: 2,
//       label: { text: 'Projet concerné' },
//       editorType: 'dxTextBox',
//       dataField: 'project_id',
//     });
//     form.itemOption('mainGroup', 'items', mainGroupItems);
//   }

//   if (!mainGroupItems.find((i) => i.dataField === 'address_id')) {
//     mainGroupItems.push({
//       colSpan: 2,
//       label: { text: 'Adresse du client' },
//       editorType: 'dxTextBox',
//       dataField: 'address_id',
//     });
//     form.itemOption('mainGroup', 'items', mainGroupItems);
//   }
// };

function Schedule() {
  loadMessages(frMessages);
  loadMessages({
    fr: {
      'dxScheduler-allDay': 'Journée',
    },
  });
  locale(navigator.language);

  return (
    <div>
      <Scheduler
        timeZone="Europe/Paris"
        dataSource={data}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={650}
        startDayHour={8}
        // onAppointmentFormOpening={onAppointmentFormOpening}

      >

        <Resource
          dataSource={resourcesData}
          fieldExpr="projectsId"
          label="Projet"
        />
      </Scheduler>
    </div>

  );
}

export default Schedule;
