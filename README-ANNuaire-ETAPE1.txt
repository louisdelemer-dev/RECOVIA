RECOVIA — PATCH ANNUAIRE, ÉTAPE 1 (29/10/2026)

Ajouter ces 4 fichiers à la racine du dépôt GitHub, en conservant les sous-dossiers :
- annuaire.html
- fiche-entreprise.html
- assets/css/annuaire.css
- assets/js/annuaire.js

AUCUN fichier existant à modifier. Aucun lien ajouté au menu, footer, sitemap ni autres pages.

TEST APRÈS DÉPLOIEMENT :
https://recovia-france.fr/annuaire.html
Rechercher une société par nom ou SIREN, puis ouvrir une fiche.

ATTENTION : DISCRÉTION ≠ ACCÈS PRIVÉ. Ces pages sont publiquement accessibles à toute personne disposant de leur adresse. La directive noindex,nofollow demande aux moteurs de ne pas indexer les pages, mais n'est pas une garantie de confidentialité. Pour un accès réellement privé, prévoir une authentification ou un environnement de préproduction protégé.

Ce prototype interroge directement l’API publique officielle depuis le navigateur. Il ne crée ni base de données ni milliers de pages SEO. Les fiches sont chargées côté client ; l'indexation SEO sera étudiée en phase 2 après validation et une architecture de pages pré-rendues. Le formulaire de contact existant est préservé ; les paramètres entreprise/siren sont transmis dans l'URL, mais ne sont pas encore automatiquement injectés dans le formulaire.

Pour la mise en production : retirer noindex seulement après validation, ajouter des pages statiques pré-rendues réellement utiles, un sitemap et une stratégie d'actualisation, puis rendre l'annuaire visible dans le menu.
