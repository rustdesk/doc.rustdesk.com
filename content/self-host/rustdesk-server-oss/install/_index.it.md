---
title: Installazione
weight: 1
---

## Tutorial video
Ci sono molti tutorial video su YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Requisiti del server
I requisiti hardware sono molto bassi; la configurazione minima di un server cloud di base è sufficiente e i requisiti di CPU e memoria sono minimi. Puoi anche utilizzare un Raspberry Pi o qualcosa di simile. Per quanto riguarda la dimensione della rete, se la connessione diretta con perforazione TCP fallisce, verrà consumato il traffico di relay. Il traffico di una connessione relay è compreso tra 30 K/s e 3 M/s (schermo 1920x1080) a seconda delle impostazioni di risoluzione e aggiornamento dello schermo. Se è solo per esigenze di lavoro d'ufficio, il traffico è di circa 100 K/s.

## Firewall
Se hai UFW installato, usa i seguenti comandi per configurare il firewall:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## Installazione
### Metodo 1: Docker (Consigliato)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Per maggiori dettagli, consulta [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Metodo 2: Installa il tuo server come servizio systemd usando uno script di installazione semplice
Lo script è ospitato su [Techahold](https://github.com/techahold/rustdeskinstall) e supportato sul nostro [Discord](https://discord.com/invite/nDceKgxnkV).

Attualmente lo script scaricherà e configurerà i server Relay e Signal (hbbr e hbbs), genererà le configurazioni e le ospiterà su una pagina web protetta da password per una semplice distribuzione ai client.

Esegui i seguenti comandi:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

C'è anche uno script di aggiornamento nel repository di [Techahold](https://github.com/techahold/rustdeskinstall).

Da lì, prendi nota dell'IP/DNS e della chiave mostrati alla fine dell'installazione e inseriscili nei campi `Server ID` e `Chiave` di Impostazioni > Rete > Server ID/Relay del client, rispettivamente, lasciando vuoti gli altri campi (vedi nota sotto).

### Metodo 3: Installa il tuo server come servizio systemd usando file deb per distribuzioni debian

Si prega di [scaricare](https://github.com/rustdesk/rustdesk-server/releases/latest) i file deb e installarli con `apt-get -f install <filename>.deb` o `dpkg -i <filename>.deb`.

## Configurare il client
Si prega di consultare [questo](/docs/en/self-host/client-configuration/#2-manual-config).