import React from 'react';
import ClientHeader from './ClientHeader';
import './style.scss';

function Client() {
  return (
    <div className="client">
      <ClientHeader />
      <p>Vous êtes dans la page Client</p>
    </div>
  );
}

export default Client;
