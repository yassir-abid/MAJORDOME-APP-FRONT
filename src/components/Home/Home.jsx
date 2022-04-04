import React from 'react';
import './style.scss';

function Home() {
  return (
    <div className="Home">
      <header>
        ici mon logo
      </header>
      <main>
        <p>
          Majordome,<br />
          c’est un outil de gestion d’activité ,
          un assistant personnel à destination des auto-entrepreneurs ,
          artisans où toutes personnes travaillant seul de manière itinérante.
          Majordome va vous aider à organiser votre journée, ranger vos documents,
          gérer vos clients, votre activités et vos interventions.
        </p>
      </main>
      <footer>
        <div>btn 1</div>
        <div>btn 2</div>
      </footer>
    </div>
  );
}

export default Home;
