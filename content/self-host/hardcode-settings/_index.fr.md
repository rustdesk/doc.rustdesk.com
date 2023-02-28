---
title: Paramètres personnalisés codés en dur
weight: 49
---

## Serveur personnalisé
{{% notice note %}}
Pour coder en dur les paramètres personnalisés serveur dans vos exécutables, vous devez [compiler](/docs/fr/dev/build/) le client vous-même.
{{% /notice %}}
{{% notice note %}}
**Si vous définissez l'une de ces valeurs sans définir l'autre, votre exécutable ne fonctionnera pas !**
{{% /notice %}}

Vous pouvez définir les variables d'environnement suivantes dans votre système d'exploitation et Rustdesk les utilisera lors de la compilation du client sinon il prendra les valeurs par défaut de Rustdesk.com.

Si vous ne savez pas comment définir une variable d'environnement dans votre système, vous devriez pouvoir trouver en ligne la documentation correspondante à votre système d'exploitation.

#### RENDEZVOUS_SERVER
Cette variable doit être définie avec l'URL de votre serveur.

Exemple:
```
rustdesk-serveur.mon-domaine.fr
```

#### RS_PUB_KEY
Cette variable sera votre clé publique, plus d'informations sur cette clé sont disponibles [ici](/docs/fr/self-host/install/#clé)


Exemple:
```
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```
