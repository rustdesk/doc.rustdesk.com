---
title: Hardcodering van aangepaste instellingen 
weight: 49
---

## Aangepaste Server
{{% notice note %}}
Om de aangepaste instellingen van de server vast te leggen in uw uitvoerbare bestanden, moet u de client zelf [compileren](/docs/en/dev/build/).
{{% /notice %}}
{{% notice note %}}
**Als u een van deze waarden instelt zonder de andere in te stellen, zal uw uitvoerbaar programma niet werken!**
{{% /notice %}}

U kunt de volgende omgevingsvariabelen op uw OS instellen en rustdesk zal deze variabelen gebruiken bij het compileren van uw client in plaats van de standaard rustdesk.com servers. 

Als u niet weet hoe u een omgevingsvariabele op uw systeem moet instellen, moet u online documentatie voor uw besturingssysteem kunnen zoeken die dit uitlegt.

#### RENDEZVOUS_SERVER
Deze variabele moet worden ingesteld op de URL van uw server.

Dit moet een tekenreeks zijn zoals
```
rustdesk.my-domain.com
```

#### RS_PUB_KEY
Deze variabele zal uw publieke sleutel zijn, meer informatie over de sleutel is beschikbaar [hier](/docs/en/self-host/install/#key).

Dit moet een tekenreeks zijn zoals
```
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```
