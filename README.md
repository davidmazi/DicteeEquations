# DicteeEquations


## Installation
Pour utiliser cet outil il faut :
- Cloner le repository
- Créer le fichier scripts/config.js avec une clé d'[API Microsoft Cognitive Services](https://docs.microsoft.com/en-gb/azure/cognitive-services/speech-service/get-started).
```javascript
const config = {
  apiKey: "APIKey"
};

```
- Ouvrir ensuite le fichier `index.html` sur un navigateur

## Utilisation
Il est très important de respecter les commandes écrites sur les boutons pour qu'elles soient bien reconnues.

À chaque pause, l'utilisateur peut dicter la partie suivante de l'équation.

Afin d'afficher l'équation finale, il faut finir par dire "fin".
