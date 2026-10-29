PATCH RECOVIA – Google tag / suivi des leads – 29/10/2026

Fichiers à remplacer :
- assets/js/script.js
- politique-confidentialite.html
- mentions-legales.html
- message-debiteur-envoye.html

Fonctionnement :
- La balise Google G-QY72109W09 n'est chargée qu'après acceptation des cookies.
- Un bouton "Gérer les cookies" permet de modifier le choix.
- La page /contact-envoye(.html) envoie l'événement GA4 "generate_lead" après consentement.
- L'événement n'est envoyé qu'une fois par session afin d'éviter les doublons lors d'un rechargement.
- La politique de confidentialité est mise à jour.

Après déploiement :
1. Ouvrir le site en navigation privée.
2. Accepter les cookies.
3. Dans Google Ads, cliquer sur "Tester l'installation".
4. Configurer/importer "generate_lead" comme conversion principale RECOVIA (ou créer une conversion basée sur /contact-envoye).
