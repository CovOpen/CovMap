import React from "react";
import Typography from "@material-ui/core/Typography";

export const Legal = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Rechtliches</Typography>
        </section>
        <section>
          <Typography variant="h2">Rechtliche Hinweise</Typography>
          <Typography variant="body1">Haftungsausschluss (Disclaimer)</Typography>
        </section>
        <section>
          <Typography variant="h2">Allgemeiner Hinweis</Typography>
          <Typography variant="body1">
            Die Nutzung dieser App ersetzt keine ärztliche Behandlung. Wenn Sie sich aktuell schwer krank fühlen, suchen
            Sie bitte umgehend medizinische Hilfe.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Haftung für Inhalte</Typography>
          <Typography variant="body1">
            Als Dienstanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Dienstanbieter jedoch nicht verpflichtet, übermittelte
            oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Haftung für Links</Typography>
          <Typography variant="body1">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Urheberrecht</Typography>
          <Typography variant="body1">
            Die durch den Dienstanbieter erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
            die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
            Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </Typography>
        </section>
      </main>
    </>
  );
};
