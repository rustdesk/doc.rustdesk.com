---
title: Allemaal met Github-acties
weight: 35
---

{{% notice note %}}
Deze build gebruikt github acties, je hebt een github account nodig, ook het bouwen kan traag zijn, maar dit vereist geen ontwikkelomgeving.
{{% /notice %}}

## Maak een fork

Ga naar https://github.com/rustdesk/rustdesk/fork en klik op "Create fork".

## Stel uw omgevingsvariabelen in (optioneel)

{{% notice note %}}
Je hoeft dit alleen te doen als je de standaard server en publieke sleutel wenst te wijzigen.

De server URL en sleutel die u gebruikt is verborgen voor andere gebruikers op Github maar zij kunnen uw client downloaden en verbinding maken met uw server. Als u een volledig private repo nodig heeft kunt u de rustdesk client repo importeren via https://github.com/new/import. **Als u een private repo gebruikt heeft u een beperkt aantal builds dat u per maand kunt aanmaken, als u meer nodig heeft heeft u een betaald Github account nodig.**

{{% /notice %}}

Op je zojuist gemaakte fork ga je naar "Settings -> Secrets and variables -> Actions".

Klik "New repository secret", voor de name geef RENDEZVOUS_SERVER, voor the secret geef de naam/het ip-adres van uw server.

Klik "Add secret".

Klik "New repository secret", voor de name geef RS_PUB_KEY, fof the secret zet uw servers openbare sleutel.

Klik "Add secret".

## Workflows inschakelen

Op je zojuist gemaakte fork ga je naar "Settings -> Actions -> General".

Selecteer rechts "Allow all actions and reusable workflows".

Zodra workflows zijn ingeschakeld, kunt u klikken op "Flutter Nightly Build" aan de linkerkant en klik op "Run workflow" rechts om de rustdesk clients te bouwen voor alle ondersteunde platformen.

## Uploadrechten voor workflows inschakelen

Op je zojuist gemaakte fork ga je naar "Settings -> Actions -> General".

Scroll naar beneden en schakel onder Workflow toestemmingen in "Read and write permissions".

## Download uw gemaakte pakketten

Nadat de workflow is uitgevoerd kunt u de gemaakte pakketten downloaden.

Ga naar de hoofdpagina van uw fork, klik rechts op "Releases". De pakketten die je net hebt gebouwd zullen verschijnen onder "Nightly".
