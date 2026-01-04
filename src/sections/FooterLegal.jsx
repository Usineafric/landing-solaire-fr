export default function FooterLegal() {
  return (
    <footer className="bg-gray-950 text-white/85">
      <div className="container-page py-10">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <div className="text-white font-semibold">Informations légales</div>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Éditeur : <span className="text-white/85">IDTRADING LLC</span> — La villa Torrimar, Reina Margarita 112, Guaynabo, 00969, Puerto Rico.
              <br />
              Contact :{" "}
              <a className="underline hover:text-white" href="mailto:privacy@leadspodium.com">
                privacy@leadspodium.com
              </a>
            </p>
            <p className="mt-3 text-xs text-white/50">
              Hébergement : Netlify (Netlify, Inc., San Francisco, USA).
            </p>
          </div>

          <div className="md:text-right">
            <div className="text-white font-semibold">Liens</div>
            <div className="mt-3 flex md:justify-end gap-5 text-sm">
              <a className="underline hover:text-white" href="/mentions-legales">
                Mentions légales
              </a>
              <a className="underline hover:text-white" href="/politique-de-confidentialite">
                Politique de confidentialité
              </a>
              <a className="underline hover:text-white" href="/cookies">
                Cookies
              </a>
            </div>

            <p className="mt-4 text-xs text-white/50">
              En soumettant ce formulaire, vous acceptez d’être recontacté dans le cadre de votre demande.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/45 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>© {new Date().getFullYear()} IDTRADING LLC</span>
          <span>Version white-label — Étude solaire (France)</span>
        </div>
      </div>
    </footer>
  );
}
