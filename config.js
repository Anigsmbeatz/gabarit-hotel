/* ============================================================================
   CONFIGURATION DU SITE
   ----------------------------------------------------------------------------
   C'EST LE SEUL FICHIER À MODIFIER pour adapter ce modèle à un nouveau client.
   Nom, couleurs, téléphone, WhatsApp, adresse, réseaux sociaux, monnaie,
   et toutes les traductions FR / EN se trouvent ici.

   Ne touche ni à index.html, ni à style.css, ni à script.js tant que tu
   n'as pas besoin de changer la STRUCTURE du site.
   ============================================================================ */

window.SITE = {

  /* ---------------------------------------------------------------------
     1. IDENTITÉ
     --------------------------------------------------------------------- */
  brand: {
    name:      "Le Prestige",          // Nom affiché partout
    legalName: "Le Prestige SARL",     // Raison sociale (pages légales)
    stars:     5,                      // Nombre d'étoiles (0 = masqué)
    url:       "https://le-prestige.example",   // URL finale du site
    founded:   "1985"
  },

  /* ---------------------------------------------------------------------
     2. COULEURS
     Change ces 3 premières valeurs et tout le site change d'ambiance.
     --------------------------------------------------------------------- */
  theme: {
    primary:      "#b8894a",   // Couleur principale (boutons, accents)
    primaryDark:  "#9a6f37",   // Survol des boutons
    primaryLight: "#e0b876",   // Accents clairs sur fond sombre
    dark:         "#1a1a1a",   // Fonds sombres (footer, newsletter)
    dark2:        "#2c2c2c",   // Texte principal
    grayLight:    "#f8f5f0"    // Fonds de section clairs
  },

  /* ---------------------------------------------------------------------
     3. CONTACT  (le cœur de la conversion)
     --------------------------------------------------------------------- */
  contact: {
    phoneDisplay: "+225 07 12 44 64 93",   // Tel affiché
    phone:        "+2250712446493",        // Tel cliquable (sans espaces)
    phone2Display:"+225 01 72 08 56 78",
    phone2:       "+2250172085678",

    // WhatsApp : indicatif pays + numéro, SANS +, sans espace, sans 00
    // Côte d'Ivoire = 225, France = 33, Sénégal = 221...
    whatsapp:     "2250712446493",

    email:        "contact@le-prestige.example",
    emailBooking: "reservation@le-prestige.example",

    address: {
      street:  "Boulevard de la Corniche",
      zone:    "Cocody",
      city:    "Abidjan",
      country: "Côte d'Ivoire"
    },

    // Coordonnées GPS : clic droit sur Google Maps > le 1er chiffre = latitude
    geo: { lat: 5.3486, lng: -3.9860 },

    // Zone affichée sur la carte : gauche,bas,droite,haut (longitudes/latitudes)
    mapBox: "-4.01,5.32,-3.95,5.37"
  },

  /* ---------------------------------------------------------------------
     4. RÉSEAUX SOCIAUX   (laisse "" pour masquer une icône)
     --------------------------------------------------------------------- */
  social: {
    facebook:  "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin:  "",
    twitter:   ""
  },

  /* ---------------------------------------------------------------------
     5. PRIX
     Les montants sont écrits dans index.html (attribut data-price).
     Ici on ne règle que l'affichage.
     --------------------------------------------------------------------- */
  price: {
    currency: "FCFA",     // "FCFA", "€", "$", "MAD"...
    position: "after",    // "after" -> 45 000 FCFA   |  "before" -> €120
    locale:   "fr-FR"     // séparateur de milliers
  },

  /* ---------------------------------------------------------------------
     6. RÉSERVATION  (par WhatsApp uniquement)
     Le formulaire ne vérifie PAS de vraie disponibilité : il compose un
     message prêt à envoyer. C'est ce qui rend la démo crédible.
     L'envoi par email a été retiré : un lien « mailto » ne fonctionne que
     si le visiteur a un logiciel de messagerie configuré, ce qui n'est
     pas le cas de la majorité des appareils.
     --------------------------------------------------------------------- */
  booking: {
    autoOpenWhatsApp: false   // true = ouvre WhatsApp directement au clic
  },

  /* ---------------------------------------------------------------------
     7. LANGUES
     Retire une langue de "languages" pour la masquer.
     Mets languages: [] pour supprimer complètement le sélecteur.
     --------------------------------------------------------------------- */
  defaultLang: "fr",
  languages: [
    { code: "fr", label: "Français" },
    { code: "en", label: "English"  }
  ],

  /* ---------------------------------------------------------------------
     8. TEXTES  (tout le contenu éditorial du site)
     Chaque clé correspond à un data-i18n="..." dans index.html.
     --------------------------------------------------------------------- */
  t: {
    fr: {
      "meta.title":       "Le Prestige — Hôtel & Spa à Abidjan",
      "meta.description": "Hôtel de charme à Abidjan : chambres élégantes, spa, restaurant et service attentionné. Réservation directe par WhatsApp.",

      "skip":             "Aller au contenu",
      "nav.home":         "Accueil",
      "nav.rooms":        "Chambres",
      "nav.gallery":      "Galerie",
      "nav.services":     "Services",
      "nav.reviews":      "Avis",
      "nav.contact":      "Contact",
      "nav.book":         "Réserver",

      "hero.eyebrow":     "Bienvenue à Abidjan",
      "hero.title":       "L'excellence à l'état <span>pur</span>",
      "hero.text":        "Une parenthèse de calme au cœur de la ville. Confort, élégance et service attentionné.",
      "hero.cta1":        "Réserver maintenant",
      "hero.cta2":        "Découvrir",

      "book.title":       "Réservez votre séjour",
      "book.subtitle":    "Réponse en moins d'une heure · Annulation gratuite",
      "book.in":          "Arrivée",
      "book.out":         "Départ",
      "book.guests":      "Personnes",
      "book.type":        "Type de chambre",
      "book.any":         "Toutes",
      "book.submit":      "Demander une disponibilité",
      "book.person":      "personne",
      "book.persons":     "personnes",
      "book.err_dates":   "Merci de renseigner vos dates.",
      "book.err_order":   "La date de départ doit être après l'arrivée.",
      "book.recap":       "Votre demande",
      "book.night":       "nuit",
      "book.nights":      "nuits",
      "book.send_wa":     "Envoyer sur WhatsApp",
      "book.note":        "Aucun paiement en ligne : votre demande part directement à la réception.",
      "book.msg_intro":   "Bonjour, je souhaite réserver",

      "rooms.title":      "Nos Chambres",
      "rooms.subtitle":   "Choisissez l'espace qui vous ressemble",
      "rooms.f_all":      "Toutes",
      "rooms.f_1":        "Classique",
      "rooms.f_2":        "Deluxe",
      "rooms.f_3":        "Présidentielle",
      "rooms.night":      "/ nuit",
      "rooms.book":       "Réserver",
      "rooms.reviews":    "avis",
      "room1.name":       "Chambre Classique",
      "room1.desc":       "Confort essentiel, lit queen-size, vue sur la ville.",
      "room1.badge":      "Populaire",
      "room2.name":       "Suite Deluxe",
      "room2.desc":       "Espace premium avec salon séparé et vue panoramique.",
      "room2.badge":      "Premium",
      "room3.name":       "Suite Présidentielle",
      "room3.desc":       "L'excellence absolue : jacuzzi et terrasse privée.",
      "room3.badge":      "Luxe",
      "feat.wifi":        "Wi-Fi",
      "feat.ac":          "Climatisation",
      "feat.tv":          "TV",
      "feat.bath":        "Baignoire",
      "feat.view":        "Vue",
      "feat.jacuzzi":     "Jacuzzi",
      "feat.roomservice": "Room service",
      "feat.concierge":   "Conciergerie",

      "gallery.title":    "Notre Galerie",
      "gallery.subtitle": "Découvrez notre univers en images",
      "gal.1":            "Réception",
      "gal.2":            "Chambre classique",
      "gal.3":            "Suite deluxe",
      "gal.4":            "Restaurant",
      "gal.5":            "Spa",
      "gal.6":            "Terrasse",
      "gal.7":            "Hall d'accueil",
      "gal.8":            "Vue extérieure",

      "services.title":    "Nos Services",
      "services.subtitle": "Tout pour un séjour sans fausse note",
      "svc1.t": "Restaurant",   "svc1.d": "Cuisine locale et internationale",
      "svc2.t": "Spa & bien-être", "svc2.d": "Massages, hammam et sauna",
      "svc3.t": "Piscine",      "svc3.d": "Espace détente ouvert 7j/7",
      "svc4.t": "Navette aéroport", "svc4.d": "Transfert sur simple demande",
      "svc5.t": "Salle de sport", "svc5.d": "Équipements récents",
      "svc6.t": "Réception 24/7", "svc6.d": "Une équipe à votre écoute",

      "reviews.title":    "Ce que disent nos clients",
      "reviews.subtitle": "Note moyenne 4.8 / 5",
      "rev1.text": "Un séjour vraiment reposant. Le personnel est aux petits soins et la suite était superbe. Je recommande.",
      "rev1.loc":  "Abidjan",
      "rev2.text": "Le spa est excellent et le restaurant vaut à lui seul le détour. Une adresse que je garde.",
      "rev2.loc":  "Dakar",
      "rev3.text": "Chambre impeccable, très belle vue. Petit bémol sur le petit-déjeuner, mais la qualité est là.",
      "rev3.loc":  "Paris",
      "rev4.text": "Réception exceptionnelle, ils ont organisé toute notre semaine. Bravo à l'équipe.",
      "rev4.loc":  "Accra",

      "news.title":  "Recevez nos offres",
      "news.text":   "-15 % sur votre première réservation en vous inscrivant",
      "news.ph":     "Votre adresse email",
      "news.submit": "S'inscrire",
      "news.note":   "Vos données restent confidentielles. Désinscription en un clic.",
      "news.ok":     "Merci ! Votre inscription est bien enregistrée.",

      "contact.title":    "Nous trouver",
      "contact.subtitle": "Une question ? Une demande particulière ?",
      "contact.address":  "Adresse",
      "contact.phone":    "Téléphone",
      "contact.email":    "Email",
      "contact.hours":    "Réception",
      "contact.hours_v":  "Ouverte 24h/24 · 7j/7",
      "contact.map_btn":  "Ouvrir dans Maps",
      "contact.write":    "Écrivez-nous",
      "contact.f_name":   "Votre nom",
      "contact.f_msg":    "Votre message",
      "contact.f_send":   "Envoyer sur WhatsApp",

      "footer.about":  "Une adresse d'exception au cœur de la ville, depuis",
      "footer.nav":    "Navigation",
      "footer.contact":"Contact",
      "footer.news":   "Newsletter",
      "footer.newstext":"Restez informé de nos offres.",
      "footer.rights": "Tous droits réservés.",
      "footer.legal1": "Mentions légales",
      "footer.legal2": "Confidentialité",
      "footer.legal3": "CGV",
      "footer.credit": "Site réalisé par",

      "lb.close": "Fermer", "lb.prev": "Précédent", "lb.next": "Suivant",
      "a11y.top": "Retour en haut", "a11y.menu": "Menu", "a11y.wa": "Écrire sur WhatsApp"
    },

    en: {
      "meta.title":       "Le Prestige — Hotel & Spa in Abidjan",
      "meta.description": "Boutique hotel in Abidjan: elegant rooms, spa, restaurant and attentive service. Direct booking via WhatsApp.",

      "skip":             "Skip to content",
      "nav.home":         "Home",
      "nav.rooms":        "Rooms",
      "nav.gallery":      "Gallery",
      "nav.services":     "Services",
      "nav.reviews":      "Reviews",
      "nav.contact":      "Contact",
      "nav.book":         "Book now",

      "hero.eyebrow":     "Welcome to Abidjan",
      "hero.title":       "Excellence in its <span>purest</span> form",
      "hero.text":        "A quiet retreat in the heart of the city. Comfort, elegance and attentive service.",
      "hero.cta1":        "Book now",
      "hero.cta2":        "Explore",

      "book.title":       "Book your stay",
      "book.subtitle":    "Answer within the hour · Free cancellation",
      "book.in":          "Check-in",
      "book.out":         "Check-out",
      "book.guests":      "Guests",
      "book.type":        "Room type",
      "book.any":         "Any",
      "book.submit":      "Check availability",
      "book.person":      "guest",
      "book.persons":     "guests",
      "book.err_dates":   "Please select your dates.",
      "book.err_order":   "Check-out must be after check-in.",
      "book.recap":       "Your request",
      "book.night":       "night",
      "book.nights":      "nights",
      "book.send_wa":     "Send on WhatsApp",
      "book.note":        "No online payment: your request goes straight to the front desk.",
      "book.msg_intro":   "Hello, I would like to book",

      "rooms.title":      "Our Rooms",
      "rooms.subtitle":   "Find the space that suits you",
      "rooms.f_all":      "All",
      "rooms.f_1":        "Classic",
      "rooms.f_2":        "Deluxe",
      "rooms.f_3":        "Presidential",
      "rooms.night":      "/ night",
      "rooms.book":       "Book",
      "rooms.reviews":    "reviews",
      "room1.name":       "Classic Room",
      "room1.desc":       "Essential comfort, queen-size bed, city view.",
      "room1.badge":      "Popular",
      "room2.name":       "Deluxe Suite",
      "room2.desc":       "Premium space with separate lounge and panoramic view.",
      "room2.badge":      "Premium",
      "room3.name":       "Presidential Suite",
      "room3.desc":       "Absolute excellence: jacuzzi and private terrace.",
      "room3.badge":      "Luxury",
      "feat.wifi":        "Wi-Fi",
      "feat.ac":          "Air con",
      "feat.tv":          "TV",
      "feat.bath":        "Bathtub",
      "feat.view":        "View",
      "feat.jacuzzi":     "Jacuzzi",
      "feat.roomservice": "Room service",
      "feat.concierge":   "Concierge",

      "gallery.title":    "Our Gallery",
      "gallery.subtitle": "A glimpse of our world",
      "gal.1":            "Lobby",
      "gal.2":            "Classic room",
      "gal.3":            "Deluxe suite",
      "gal.4":            "Restaurant",
      "gal.5":            "Spa",
      "gal.6":            "Terrace",
      "gal.7":            "Entrance hall",
      "gal.8":            "Exterior view",

      "services.title":    "Our Services",
      "services.subtitle": "Everything for a flawless stay",
      "svc1.t": "Restaurant",   "svc1.d": "Local and international cuisine",
      "svc2.t": "Spa & wellness", "svc2.d": "Massage, hammam and sauna",
      "svc3.t": "Swimming pool", "svc3.d": "Open every day",
      "svc4.t": "Airport shuttle", "svc4.d": "Transfer on request",
      "svc5.t": "Fitness room", "svc5.d": "Recent equipment",
      "svc6.t": "24/7 front desk", "svc6.d": "A team at your service",

      "reviews.title":    "What our guests say",
      "reviews.subtitle": "Average rating 4.8 / 5",
      "rev1.text": "A truly restful stay. The staff went out of their way and the suite was superb. Highly recommended.",
      "rev1.loc":  "Abidjan",
      "rev2.text": "The spa is excellent and the restaurant alone is worth the trip. An address I'm keeping.",
      "rev2.loc":  "Dakar",
      "rev3.text": "Spotless room, beautiful view. Breakfast could be better, but the quality is there.",
      "rev3.loc":  "Paris",
      "rev4.text": "Outstanding front desk, they organised our entire week. Well done to the team.",
      "rev4.loc":  "Accra",

      "news.title":  "Get our offers",
      "news.text":   "-15% on your first booking when you subscribe",
      "news.ph":     "Your email address",
      "news.submit": "Subscribe",
      "news.note":   "Your data stays private. Unsubscribe in one click.",
      "news.ok":     "Thank you! Your subscription is confirmed.",

      "contact.title":    "Find us",
      "contact.subtitle": "A question? A special request?",
      "contact.address":  "Address",
      "contact.phone":    "Phone",
      "contact.email":    "Email",
      "contact.hours":    "Front desk",
      "contact.hours_v":  "Open 24/7",
      "contact.map_btn":  "Open in Maps",
      "contact.write":    "Write to us",
      "contact.f_name":   "Your name",
      "contact.f_msg":    "Your message",
      "contact.f_send":   "Send on WhatsApp",

      "footer.about":  "An exceptional address in the heart of the city, since",
      "footer.nav":    "Navigation",
      "footer.contact":"Contact",
      "footer.news":   "Newsletter",
      "footer.newstext":"Stay informed about our offers.",
      "footer.rights": "All rights reserved.",
      "footer.legal1": "Legal notice",
      "footer.legal2": "Privacy",
      "footer.legal3": "Terms",
      "footer.credit": "Website by",

      "lb.close": "Close", "lb.prev": "Previous", "lb.next": "Next",
      "a11y.top": "Back to top", "a11y.menu": "Menu", "a11y.wa": "Message on WhatsApp"
    }
  },

  /* ---------------------------------------------------------------------
     9. TA SIGNATURE (le lien discret en bas de page = ta prospection)
     Mets label: "" pour la retirer.
     --------------------------------------------------------------------- */
  credit: {
    label: "",              // ex : "Anicet W."
    url:   ""               // ex : "https://ton-portfolio.ci"
  }
};
