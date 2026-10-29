PATCH RECOVIA — GOOGLE TAG / CONSENT MODE V2

Fichier à remplacer :
- assets/js/script.js

Ce correctif :
- charge la balise Google G-QY72109W09 sur toutes les pages ;
- applique Consent Mode v2 avec analytics/ad storage refusés par défaut ;
- ne passe les consentements à "granted" qu'après clic sur « Tout accepter » ;
- conserve « Tout refuser » et « Gérer les cookies » ;
- conserve l'événement generate_lead sur /contact-envoye uniquement après consentement ;
- évite le double comptage du lead lors d'un rechargement de page dans la même session.

Après déploiement Netlify :
1. ouvrir recovia-france.fr dans une fenêtre privée ;
2. la balise doit être détectable même avant acceptation ;
3. dans Google Ads, cliquer sur « Retester » ;
4. pour tester la conversion, accepter les cookies puis soumettre le formulaire jusqu'à /contact-envoye.
