RECOVIA — Correctif Google tag v4

But : rendre la balise Google détectable par Google Ads tout en conservant Consent Mode v2.

Installation : remplacer les fichiers contenus dans ce ZIP aux mêmes emplacements dans le dépôt GitHub, puis laisser Netlify redéployer.

La balise G-QY72109W09 est désormais placée directement dans le <head> de chaque page. Les stockages analytics/publicitaires sont refusés par défaut puis passent à granted uniquement après clic sur « Tout accepter ».

Après déploiement : ouvrir https://recovia-france.fr/ puis cliquer sur « Retester » dans Google Ads.
