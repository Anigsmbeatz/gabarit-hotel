# Gabarit « Hôtel » — mode d'emploi

Modèle de site vitrine prêt à démontrer, conçu pour être **rebrandé en 30 minutes**
pour un nouveau client. Aucune librairie externe, aucun outil à installer :
on ouvre `index.html` et ça marche — y compris **sans connexion Internet**.

---

## 1. Les fichiers

| Fichier | À quoi ça sert | Tu y touches ? |
|---|---|---|
| `config.js` | Nom, couleurs, téléphone, WhatsApp, adresse, monnaie, **tous les textes FR/EN** | **Oui, tout le temps** |
| `assets/img/` | Les photos | **Oui** (tu remplaces les fichiers) |
| `index.html` | La structure des sections, les prix (`data-price`) | Parfois |
| `style.css` | L'apparence | Rarement |
| `script.js` | Le moteur (lit `config.js`) | Presque jamais |
| `mentions-legales.html`, `confidentialite.html`, `cgv.html` | Pages légales à compléter | Oui, avant mise en ligne |
| `robots.txt`, `sitemap.xml` | Référencement | Le domaine uniquement |
| `_headers` / `.htaccess` | Sécurité (voir § 7) | Non |
| `WHATSAPP.md` | Kit de configuration WhatsApp Business pour le client | C'est une prestation à part |

---

## 2. Personnaliser pour un client — la checklist des 30 minutes

1. **Copier le dossier** entier et le renommer au nom du client.
2. **`config.js` → `brand`** : nom, raison sociale, année de création, URL finale.
3. **`config.js` → `theme`** : les 3 premières couleurs suffisent à changer l'ambiance.
   Prends-les dans le logo du client.
4. **`config.js` → `contact`** : téléphone, **numéro WhatsApp** (indicatif pays sans `+`,
   ex. `2250700000000`), emails, adresse, coordonnées GPS.
   *Les GPS : sur Google Maps, clic droit sur le lieu → les deux chiffres s'affichent.*
5. **`config.js` → `social`** : les URL réelles. Laisse `""` pour masquer une icône.
6. **`config.js` → `price`** : `FCFA`, `€`, `$`… et la position du symbole.
7. **`config.js` → `t.fr`** : relis tous les textes. Ce sont eux qui font la différence
   entre une démo et un site crédible.
8. **Les prix** sont dans `index.html`, attribut `data-price="45000"` (chiffres seuls,
   sans espace ni symbole : le site formate tout seul).
9. **Les photos** : remplace les fichiers de `assets/img/` en **gardant exactement les
   mêmes noms ET la même extension `.webp`**. Rien d'autre à modifier.
   Seule exception : `og-image.jpg` reste en JPEG — c'est l'aperçu affiché quand on
   partage le lien sur WhatsApp ou Facebook, et ces plateformes gèrent mal le WebP.
10. **Pages légales** : remplace tous les passages entre `[crochets]`.
11. **`robots.txt` et `sitemap.xml`** : remplace `le-prestige.example` par le vrai domaine.
12. **`config.js` → `credit`** : mets ton nom et l'adresse de ton portfolio. C'est ta
    prospection gratuite, en bas de chaque site que tu livres.

> Les images fournies sont des **remplaçantes** (dégradés avec le nom de la pièce).
> Tant qu'elles sont là, le site n'est pas montrable à un prospect.
> Photos libres et gratuites : Unsplash, Pexels, Pixabay.
>
> **Format : WebP.** Pour une photo, du plus léger au plus lourd :
> AVIF < WebP < JPEG < PNG. Le WebP pèse 25 à 35 % de moins que le JPEG à qualité
> égale et fonctionne sur tous les navigateurs depuis 2021 — sur une connexion
> mobile, ça compte. Ne laisse jamais un PNG : c'est le pire format pour une photo
> (c'est pourtant ce que sortent les générateurs d'images, pense à convertir).
>
> Passe chaque photo par squoosh.app : sortie **WebP, qualité 75-80**, largeur
> 1920 px pour le hero et 800 px pour les vignettes. Vise **moins de 150 Ko** par
> image du hero, moins de 80 Ko pour les autres.

---

## 3. Ce que le site sait faire

- **Formulaire de réservation** → compose un message WhatsApp ou un email prêt à partir
  (dates, type de chambre, nombre de personnes, nombre de nuits). Pas de vraie
  disponibilité : c'est assumé, et c'est ce qui rend la démo convaincante sans serveur.
- **Bouton WhatsApp flottant** et clic-pour-appeler sur tous les numéros.
- **Deux langues** réellement fonctionnelles, mémorisées d'une visite à l'autre.
- **Galerie** avec visionneuse (flèches, clavier, balayage tactile).
- **Filtres de chambres**, favoris mémorisés, carrousel d'avis.
- **Formulaire de contact** qui bascule sur WhatsApp.
- **SEO** : titre et description traduits, Open Graph pour le partage WhatsApp/Facebook,
  et données structurées `schema.org/Hotel` (note, prix, adresse, GPS) générées
  automatiquement depuis `config.js`.
- **Accessible** : navigation au clavier, lien d'évitement, contrastes corrects.
- **Fonctionne même si JavaScript plante** : le contenu est visible par défaut.

---

## 4. Montrer la démo en rendez-vous

- Le site marche **hors-ligne** : images, icônes et code sont locaux.
  Seules la police et la carte viennent d'Internet, et les deux ont un repli propre.
- Mets-le en ligne gratuitement (Netlify, Cloudflare Pages, GitHub Pages) : tu glisses
  le dossier, tu obtiens un lien. Génère un **QR code** de ce lien et fais-le scanner
  au prospect : il découvre le site sur son propre téléphone. C'est l'argument le plus
  efficace du rendez-vous.
- **Personnalise avant la rencontre** : 30 minutes pour mettre le nom, les couleurs et
  les photos Facebook du prospect. Il se voit dedans, la vente est à moitié faite.
  Présente-le toujours comme une **maquette préparée pour lui**, et ne publie jamais
  une page à l'identité d'un établissement réel sans son accord écrit.

---

## 5. Polices en 100 % hors-ligne (facultatif)

Par défaut les polices viennent de Google Fonts, avec un repli système correct si le
réseau manque. Pour t'en affranchir totalement :

1. Télécharge Playfair Display et Poppins sur fonts.google.com
2. Place les `.woff2` dans `assets/fonts/`
3. Ajoute en haut de `style.css` :

```css
@font-face { font-family:'Playfair Display'; src:url('assets/fonts/playfair.woff2') format('woff2'); font-weight:400 700; font-display:swap; }
@font-face { font-family:'Poppins'; src:url('assets/fonts/poppins.woff2') format('woff2'); font-weight:300 600; font-display:swap; }
```

4. Supprime la ligne `<link ... fonts.googleapis.com ...>` dans les 4 fichiers HTML.

---

## 6. Adapter le gabarit à un autre métier

La structure se transpose presque telle quelle :

| Section hôtel | Restaurant / maquis | Clinique | Agence immobilière |
|---|---|---|---|
| Chambres | Plats / menus | Spécialités | Biens |
| Réservation | Réserver une table | Prendre rendez-vous | Demander une visite |
| Galerie | Galerie | Équipe | Photos du bien |
| Services | Formules | Services | Accompagnement |
| Avis | Avis | Témoignages | Avis |

Le moteur (`script.js`), le formulaire WhatsApp, les langues et le SEO ne changent pas.
Seuls le contenu de `index.html` et les textes de `config.js` sont à réécrire.

---

## 7. Sécurité — ce que tu mets en place et ce que tu réponds au client

Ce site est **statique** : pas de base de données, pas de compte, pas d'espace
d'administration, aucun code exécuté côté serveur. Il n'y a donc **rien à pirater
au sens classique** — pas d'injection SQL, pas de mot de passe à forcer, pas
d'extension obsolète comme sur WordPress. C'est la posture de sécurité la plus
solide qui existe, et c'est un argument de vente, pas une excuse.

Ce que tu mets réellement en place :

1. **HTTPS** (le cadenas). Gratuit et automatique chez Netlify, Cloudflare Pages,
   ou via Let's Encrypt chez un hébergeur classique. Non négociable.
2. **Les en-têtes de sécurité** : dépose `_headers` (Netlify, Cloudflare Pages)
   **ou** `.htaccess` (Apache, cPanel) à la racine — un seul des deux, selon
   l'hébergeur. Ils forcent le HTTPS, empêchent l'affichage du site dans une
   iframe (faux formulaires), et n'autorisent le chargement que des ressources
   déclarées. Vérifie ensuite sur **securityheaders.com** : vise A ou A+.
3. **Zéro dépendance externe** : aucune librairie tierce n'est chargée, donc
   aucun risque qu'un CDN compromis injecte du code dans le site du client.
4. **Aucune donnée stockée** : les demandes partent vers WhatsApp ou par email.
   Pas de base, donc pas de fuite possible.
5. **Un hébergeur avec CDN et protection anti-DDoS** (Netlify, Cloudflare) :
   tu hérites gratuitement d'une infrastructure que personne ne pourrait s'offrir.
6. **Sauvegarde** : garde chaque site client dans un dépôt Git privé.

Le vrai risque n'est pas le site, ce sont **les comptes** :

- Active la **double authentification** sur ton hébergeur, ton registrar de
  domaine et ta boîte mail. C'est par là que passent les attaques réelles.
- Active le **renouvellement automatique du domaine**. Un site meurt bien plus
  souvent d'un domaine expiré que d'un piratage.
- **Enregistre le domaine au nom du client**, pas au tien. C'est son bien.
- Range les accès clients dans un gestionnaire de mots de passe (Bitwarden est
  gratuit), jamais dans un carnet ou un fichier texte.

Ce que tu ne promets **jamais** : un site « inviolable » ou « sécurisé à 100 % ».
Et le jour où le projet demande des comptes utilisateurs ou du paiement en ligne,
ce n'est plus le même métier : tu passes par un prestataire de paiement
(CinetPay, PayDunya, Stripe) et tu ne touches **jamais** toi-même à un numéro de
carte.

---

## 8. Avant de livrer à un client

- [ ] Toutes les photos sont réelles et compressées
- [ ] Aucun texte ne contient encore `[crochets]` ni « exemple »
- [ ] Numéro WhatsApp testé : le message arrive bien
- [ ] WhatsApp Business configuré chez le client (voir `WHATSAPP.md`) et l'équipe formée
- [ ] Testé sur un vrai téléphone, pas seulement en réduisant la fenêtre
- [ ] Pages légales complétées avec le RCCM et l'hébergeur
- [ ] Domaine et hébergement en place, `robots.txt` et `sitemap.xml` mis à jour
- [ ] HTTPS actif, `_headers` ou `.htaccess` en place, note A sur securityheaders.com
- [ ] Double authentification activée sur l'hébergeur et le registrar
- [ ] Renouvellement automatique du domaine activé
- [ ] Site déposé dans la Search Console de Google
- [ ] Le client a reçu ses accès (hébergement, domaine, emails)
