import React from 'react';
import './style.scss';
import logo from '../../butler.png';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header_logo">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Hello !</h1>
      </header>
      <main className="home-main">
        <p>
          Majordome,<br />
          C’est un outil de gestion d’activité,
          un assistant personnel à destination des auto-entrepreneurs,
          artisans où toutes personnes travaillant seules de manière itinérante.
          Majordome va vous aider à organiser votre journée, ranger vos documents,
          gérer vos clients, votre activité et vos interventions.
        </p>
      </main>
      <footer className="home-footer">
        <div>
          <button type="button" className="home-footer_login">
            Connexion
          </button>
        </div>
        <div>
          <button type="button" className="home-footer_signUp">
            Inscription
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Home;
