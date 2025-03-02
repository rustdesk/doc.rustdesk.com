---
title: Docker 
weight: 30
---


## Build met Docker
### Dit werkt niet op Windows

Begin met het klonen van de repository en build de docker container:

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Vervolgens voert u, telkens wanneer u de toepassing build, het volgende commando uit:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Merk op dat de eerste build langer kan duren voordat de afhankelijkheden in de cache staan, volgende builds zullen sneller zijn. Bovendien, als u verschillende argumenten moet opgeven voor het build commando, kunt u dit doen aan het einde van het commando in de `<OPTIONAL-ARGS>` positie. Als u bijvoorbeeld een geoptimaliseerde release versie wilt bouwen, voert u het bovenstaande commando uit gevolgd door `--release`. De resulterende uitvoerbare versie zal beschikbaar zijn in de doelmap op uw systeem, en kan worden uitgevoerd met:

```sh
target/debug/rustdesk
```

Of, als je een release uitvoerbaar bestand draait:

```sh
target/release/rustdesk
```

Zorg ervoor dat u deze commando's vanuit de root van de RustDesk repository uitvoert, anders kan de applicatie mogelijk de benodigde bronnen niet vinden. Merk ook op dat andere cargo subcommando's zoals `install` of `run` momenteel niet ondersteund worden via deze methode omdat ze het programma in de container installeren of uitvoeren in plaats van in de host.