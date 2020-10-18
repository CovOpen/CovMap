import React from "react";
import Typography from "@material-ui/core/Typography";

export const Privacy = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Datenschutzerklärung der CovMapp</Typography>
        </section>
        <section>
          <Typography variant="h2">1. Verantwortlichkeit</Typography>
          <Typography variant="body1">
            <p>
              Die CovMap ist ein Projekt der Charité – Universitätsmedizin Berlin, die für die Verarbeitung
              personenbezogener Daten verantwortlich ist:
            </p>
            Charité – Universitätsmedizin Berlin Charitéplatz 1<br />
            10117 Berlin
            <br />
            Deutschland
            <br />
            <br />
            Tel: +49 (0) 30 450 50
            <br />
            Website: <a href="www.charite.de">www.charite.de</a>
          </Typography>
        </section>

        <section>
          <Typography variant="h2">2. Datenschutzbeauftragte</Typography>
          <Typography variant="body1">
            Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten sowie zu Ihren Rechten rund um den Datenschutz,
            wenden Sie sich bitte an unsere Datenschutzbeauftragte:
            <br />
            <br />
            t: +49 30 450 580 016
            <br />
            E-Mail: datenschutz(at)charite.de
          </Typography>
        </section>

        <section>
          <Typography variant="h2">3. Personenbezogene Daten, Art. 4 Nr. 1 DS-GVO</Typography>
          <Typography variant="body1">
            Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
            natürliche Person beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder
            indirekt identifiziert werden kann - insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu
            einer Kennnummer, zu Standortdaten oder zu einer Online-Kennung (IP-Adresse).
          </Typography>
        </section>

        <section>
          <Typography variant="h2">4. Installation der CovMap</Typography>
          <Typography variant="body1">
            Bei der CovMap handelt es sich sowohl um eine Web-App als auch um eine App, die über eine von Dritten
            betriebene Vertriebsplattform erhältlich ist, sogenannter App-Store (hier Google Play). Ihr Download setzt
            gegebenenfalls eine vorherige Registrierung beim jeweiligen App-Store und die Installation der
            App-Store-Software voraus. Wir haben keinen Einfluss auf die Erhebung, Verarbeitung und Nutzung von
            personenbezogenen Daten im Zusammenhang mit Ihrer Registrierung und der Bereitstellung von Downloads in dem
            jeweiligen App-Store und der App-Store-Software. Verantwortliche Stelle ist insoweit allein der Betreiber
            des jeweiligen App-Stores.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">5. Aufruf der CovMap</Typography>
          <Typography variant="body1">
            a. Log-Dateien (sog. Log Files)
            <br />
            Bei jedem Zugriff auf die CovMap werden Daten über diesen Vorgang vorübergehend in einer Protokolldatei
            verarbeitet. Im Einzelnen werden folgende Daten gespeichert:
            <br />
            • das Datum und die Uhrzeit des Aufrufs der CovMap
            <br />
            • verwendete Webbrowser und verwendetes Betriebssystem
            <br />
            • die vollständige IP-Adresse des anfordernden Endgeräts <br />
            • der Name und die URL der abgerufenen Datei
            <br />
            • im Fall des Aufrufs der Web-App auch die Webseite, von der aus der Zugriff erfolgt
            <br />
            • der Name des verwendeten Internet-Providers
            <br />
            <br />
            Diese Datenverarbeitung durch unser System dient dem Zweck und unserem Interesse, die Auslieferung der
            CovMap an das Endgerät des Nutzers/der Nutzerin zu ermöglichen. Hierfür muss die IP-Adresse der Nutzenden
            für die Dauer der Sitzung gespeichert bleiben. Ihre IP-Adresse löschen wir nach Ablauf von vier Wochen. Wir
            speichern sie vier Wochen, damit wir im Fall von Datensicherheitsmängeln oder Problemen von Eingriffen der
            Nutzenden Rechtsverstöße verfolgen können. Nach Ende der vierwöchigen Aufbewahrung werden die IP-Adressen
            unverzüglich gelöscht. Im Übrigen werden die Daten in unserem System gelöscht, wenn die jeweilige Sitzung
            beendet ist. Die Erfassung der Daten zur Bereitstellung CovMap ist für den Betrieb der Applikation zwingend
            erforderlich. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO.
            <br />
            b. Session-Cookies
            <br />
            Beim Aufruf der CovMap erheben wir während einer laufenden Verbindung über Ihren Internetbrowser und mit
            Hilfe von technisch notwendigen sog. Session-Cookies Daten. Diese Daten beziehen sich lediglich auf Ihre
            IP-Adresse (siehe nachstehende Bullet Points). Session-Cookies ermöglichen die Funktionalität dieser
            Anwendungen. Sie verfallen nach 24 Stunden. Die meisten Browser sind so eingestellt, dass sie Cookies
            automatisch akzeptieren. Sie können das Speichern von Cookies jedoch deaktivieren oder Ihren Browser so
            einstellen, dass er Sie benachrichtigt, sobald Cookies gesendet werden. Durch den Einsatz von Cookies
            fließen der Stelle, die den Cookie setzt (hier der durch uns eingesetzte Auftragsverarbeiter KeyCDN, siehe
            dazu unter 6.) folgende Informationen zu:
            <br />
            • Datum und Uhrzeit des Aufrufs der Website
            <br />
            • verwendete Webbrowser und verwendetes Betriebssystem
            <br />
            • vollständige IP-Adresse des anfordernden Endgeräts
            <br />
            • übertragene Datenmenge
            <br />
            • Name des verwendeten Internet-Providers.
            <br />
            Die Verarbeitung erfolgt auf der Rechtsgrundlage des Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
            Interesse bei der Verwendung von technischen Cookies liegt in der Ermöglichung der Nutzung und
            Bereitstellung der CovMap. Bei den Cookies handelt es sich um für die Nutzung von CovMap technisch zwingend
            notwendige Cookies. <br />
            <br />
            c. Eingabe der Postleitzahl
            <br />
            Bei Aufruf der App besteht die Möglichkeit, dass Sie die Postleitzahl Ihrer Heimatadresse eingeben. Dies ist
            eine freiwillige Option und keine Voraussetzung zur Nutzung der CovMap. Sofern Sie Ihre Postleitzahl
            eingeben, wird diese mit Ihrer IP-Adresse verknüpft und durch uns dazu verwendet, Ihnen bei der
            anschließenden Darstellung der Deutschlandkarte auf den ersten Blick den Bereich Ihrer Heimatadresse und der
            unmittelbaren Umgebung anzuzeigen. Geben Sie keine Postleitzahl ein, können Sie den Fokus auf den Sie
            interessierenden Kartenabschnitt selbstständig manuell einstellen. Die Verarbeitung Ihrer Postleitzahl
            erfolgt aufgrund Ihrer freiwilligen und informierten Einwilligung gemäß Art. 6 Abs. 1 lit. a DS-GVO. Diese
            Einwilligungserklärung können Sie vor Eingabe Ihrer Postleitzahl in der Applikation durch Setzens eines
            Häkchens in einer Checkbox abgeben. Sie können die von Ihnen erteilte Einwilligungserklärung jederzeit
            widerrufen. Für einen Widerruf genügt eine E-Mail an: covmap@charite.de. Ein Widerruf bezieht sich lediglich
            auf zukünftige Datenverarbeitungsvorgänge und berührt nicht die Rechtmäßigkeit der im Vorfeld auf Grundlage
            der abgegebenen Einwilligungserklärung erfolgten Datenverarbeitung. Wir speichern die von Ihnen abgegebene
            Einwilligungserklärung. Dies dient dazu unsererseits den Nachweis führen zu können, dass Sie in die
            Datenverarbeitung durch uns eingewilligt haben. Diese Einwilligungserklärungen werden von uns zur ggf.
            notwendigen Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen für vier Jahre gespeichert, dies
            ergibt sich aus Art. 17 Abs. 3 lit. e DS-GVO.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">6. Empfänger von personenbezogenen Daten</Typography>
          <Typography variant="body1">
            Die Verarbeitung der IP-Adresse der Nutzerinnen und Nutzer der CovMap erfolgt mit den entsprechend
            vereinbarten Sicherheitsanforderungen im Rahmen einer Auftragsverarbeitung nach Art. 28 Abs. 3 DS-GVO durch
            den Technologiedienstleister proinity LLC, Rümikerstrasse 60, 8409 Winterthur, Schweiz ("KeyCDN").
            Verantwortlich für die Datenverarbeitung bleiben wir. Mit oder ohne Eingabe Ihrer Postleitzahl zeigt Ihnen
            die CovMap im Anschluss an den Aufruf der Seite bzw. App eine Karte an, auf der tagesaktuell visualisiert
            wird, in welchen Gebieten ein lokaler Ausbruch von Covid-19 zu erwarten ist. Zur Darstellung der Karte
            setzen wir ebenfalls den Dienst von KeyCDN ein. Die IP-Adresse wird nicht gespeichert. Ansonsten werden im
            Rahmen der Nutzung der CovMap keine personenbezogenen Daten von Ihnen an Dritte übermittelt, es sei denn,
            wir sind von Gesetzes wegen dazu verpflichtet oder Sie haben Ihre Einwilligung erklärt.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">
            7. Keine Pflicht zur Bereitstellung; keine automatisierte Entscheidungsfindung einschl. Profiling
          </Typography>
          <Typography variant="body1">
            Eine Pflicht zur Bereitstellung der personenbezogenen Daten besteht nicht. Eine automatisierte
            Entscheidungsfindung findet nicht statt.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">8. Ihre Rechte</Typography>
          <Typography variant="body1">
            Sie haben grundsätzlich folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten: <br />
            - Recht auf Auskunft (Art. 15 DS-GVO) <br />
            - Recht auf Berichtigung (Art. 16 DS-GVO) <br />
            - Recht auf Löschung (Art. 17 DS-GVO; “Recht auf Vergessenwerden”)
            <br />
            - Recht auf Einschränkung der Verarbeitung (Art. 18 DS-GVO)
            <br />
            - Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DS-GVO)
            <br />
            - Recht auf Datenübertragbarkeit (Art. 20 DS-GVO) <br />
            Soweit Sie uns eine Einwilligung in die Verarbeitung Ihrer Daten erteilt haben, können Sie diese jederzeit
            mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der Verarbeitung Ihrer Daten bis zum Widerruf
            bleibt hiervon unberührt. Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde in dem
            Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes über die
            Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren, wenn Sie der Ansicht sind, dass die
            Verarbeitung der Sie betreffenden personenbezogenen Daten rechtswidrig erfolgt.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Uberschrift</Typography>
          <Typography variant="body1">Inhalt</Typography>
        </section>
      </main>
    </>
  );
};
