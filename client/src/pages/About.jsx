import { Link } from "preact-router/match";

const About = () => {
  return (
    <div>
      <div className="container">
        <h1>Über Diese Webseite</h1>
        <div>
          Diese Webseit wurde als Abschlussarbeit im Rahmen der Gyminf
          Weiterbildung 2024 erstellt. Die Webseite wurde ist als single page
          application mit Preact und Express aufgebaut. Die Datenbank läuft über
          PostgreSQL. Der Quellcode ist unter{" "}
          <a
            href="https://github.com/olidec/exercise-db-preact"
            target="_blank"
          >
            GitHub
          </a>{" "}
          verfügbar.
        </div>
        Auf dieser Webseite findest du eine Sammlung von Community erstellten
        Mathematikaufgaben und -lösungen. Durchsuche die Datenbank, füge deine
        eigenen Aufgaben hinzu und teile dein Wissen mit der Community.
      </div>
      <div className="container">
        Die Aufgaben sind im LaTeX Format in der Datenbank gespeichert und
        können via verschiednen Suchmasken durchsucht werden. Deine Auswahl wird
        in einem Warenkorb gesammelt und kann anschliessend per Click als{" "}
        <code>.tex</code> Datei heruntergeladen werden.
      </div>
      <div className="container">
        Bereits registriert? Hier geht's zum <Link href="/login">Login</Link>
      </div>
      <div className="container">
        Neu hier? Hier geht's zur <Link href="/register">Registrierung</Link>
      </div>
      <div className="container">
        <h2>Bekannte Einschränkungen</h2>
        Da der LaTeX Inhalt via{" "}
        <a href="https://latex.js.org/" target="_blank">
          <code>latex.js</code>
        </a>{" "}
        angezeigt wird, werden nicht alle LaTeX Umgebungen korrekt dargestellt.
        Insbesondere die Darstellung von Tabellen funktioniert nicht. Die
        Darstellung von Formeln und Text funktioniert jedoch einwandfrei.
      </div>
      <a href="/impressum">Impressum</a>
    </div>
  );
};

export default About;
