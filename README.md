# Gabarit de site vitrine — Hôtel

Modèle de site vitrine pour établissement hôtelier, conçu pour être **rebrandé
rapidement** pour un nouveau client. HTML, CSS et JavaScript purs : aucune
librairie, aucune dépendance, aucune étape de compilation.

## Caractéristiques

- **Un seul fichier de configuration** (`config.js`) : nom, couleurs, contacts,
  monnaie et l'intégralité des textes FR / EN
- **Réservation par WhatsApp** : le formulaire compose un message structuré
  (dates, chambre, nombre de personnes, nuits) prêt à envoyer
- **Bilingue** français / anglais, choix mémorisé d'une visite à l'autre
- **Aucune ressource externe** : icônes SVG intégrées, images locales — le site
  fonctionne hors connexion
- **Référencement** : métadonnées traduites, Open Graph, données structurées
  `schema.org/Hotel` générées depuis la configuration
- **Accessible** : navigation au clavier, lien d'évitement, contrastes vérifiés
- **Robuste** : le contenu reste visible même si le JavaScript ne s'exécute pas
- **En-têtes de sécurité** fournis pour Netlify/Cloudflare (`_headers`) et
  Apache/cPanel (`.htaccess`)

## Démarrage

Ouvrir `index.html` dans un navigateur. C'est tout.

Pour adapter le site à un établissement, modifier `config.js` puis remplacer les
images de `assets/img/` en conservant les mêmes noms de fichiers.

La procédure complète est décrite dans **[LISEZMOI.md](LISEZMOI.md)**.
La configuration WhatsApp Business côté client est décrite dans
**[WHATSAPP.md](WHATSAPP.md)**.

## Structure

```
index.html              Structure des sections
config.js               Configuration et textes  ← le fichier à modifier
script.js               Moteur (lit config.js)
style.css               Apparence
assets/img/             Images
mentions-legales.html   Pages légales à compléter
confidentialite.html
cgv.html
_headers / .htaccess    En-têtes de sécurité selon l'hébergeur
```

## Licence

Tous droits réservés. Ce gabarit n'est pas libre de droits : il ne peut être
réutilisé, redistribué ou revendu sans autorisation écrite.

Les photographies présentes dans ce dépôt sont des visuels de démonstration et
ne peuvent pas être réutilisées telles quelles.
