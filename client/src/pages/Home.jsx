import { h } from "preact";
import { Link } from "preact-router/match";

const Home = () => {
  return (
    <div>
      <header>
        <h1>Mathematik-Aufgaben-Datenbank</h1>
        <p>Die beste Ressource für Mathematikaufgaben und -lösungen</p>
      </header>

      <div className="container">
        <section className="intro">
          <h2>Willkommen!</h2>
          <p>
            Unsere Plattform bietet eine umfassende Sammlung von
            Mathematikaufgaben und -lösungen für Schüler, Lehrer und
            Mathematikbegeisterte. Durchsuchen Sie unsere Datenbank, fügen Sie
            Ihre eigenen Aufgaben hinzu und teilen Sie Ihr Wissen mit der
            Community.
          </p>
        </section>

        <section className="features">
          <div className="feature">
            <h3>Umfangreiche Sammlung</h3>
            <p>
              Tausende von Mathematikaufgaben in verschiedenen Kategorien, von
              Algebra bis Stochastik.
            </p>
          </div>
          <div className="feature">
            <h3>Benutzerfreundlich</h3>
            <p>
              Einfach zu bedienende Oberfläche zum Durchsuchen, Hinzufügen und
              Verwalten von Aufgaben.
            </p>
          </div>
          <div className="feature">
            <h3>Community-Getrieben</h3>
            <p>
              Teilen Sie Ihre eigenen Aufgaben und Lösungen und helfen Sie
              anderen, Mathematik besser zu verstehen.
            </p>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Starten Sie jetzt!</h2>
          <p>
            Werden Sie Teil unserer Community und tragen Sie zur größten
            Mathematik-Sammlungsdatenbank bei.
          </p>
          <Link href="/exercise-db-preact/login">Registrieren / Login</Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
