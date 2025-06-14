---
title: Problemi di NAT Loopback
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
Questa spiegazione coinvolge conoscenze complesse di networking, abbiamo bisogno del tuo aiuto per migliorarne la leggibilità.
{{% /notice %}}


Per maggiori dettagli sul NAT Loopback, controlla la pagina di [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning).

Quando stai distribuendo il server RustDesk sulla tua rete domestica o qualsiasi altro ambiente di rete che sia dietro un firewall NAT, il server RustDesk e i tuoi client **DEVONO** sia:
A: Usare l'indirizzo IP locale per accedere l'uno all'altro OPPURE:
B: Avere un firewall che supporta e ha abilitato il NAT Loopback.

Potresti notare di non riuscire a connetterti al tuo server tramite il tuo **IP Pubblico** o **Dominio** (che in teoria punta al tuo IP pubblico).

# Problema
In questo esempio seguiremo cosa succede quando i dispositivi LAN tentano di connettersi a `rustdesk.example.com`. Assumiamo che l'IP pubblico del tuo router sia `172.16.16.1`, l'IP LAN del tuo server sia `192.168.11.20` e il dominio che desideri sia `rustdesk.example.com`, e hai un client che usa '192.168.11.2'.

Quando configuri un server dietro il NAT del router puoi aggiungere un port forward nel router per cambiare qualsiasi messaggio in entrata verso l'IP PUBBLICO 172.16.16.1 per andare al server a 192.168.11.20

Quando un dispositivo LAN vuole accedere a internet, diciamo un webserver su 8.8.8.8, invia la richiesta come proveniente da 192.168.11.2, e la invia al router. Il router intercetterà quella richiesta e riscriverà quella richiesta a 8.8.8.8 come proveniente da 172.16.16.1. Quando 8.8.8.8 risponde a 172.16.16.1 il router controllerà per una connessione precedente e reinstraderà quella risposta indietro a 192.168.11.2.

Se l'utente a 8.8.8.8 invia un messaggio alla nostra rete usando 172.16.16.1 la regola di port forward riscriverà la destinazione di 172.16.16.1 al server a 192.168.11.20 lasciando la sorgente della richiesta come 8.8.8.8 così il server può rispondere (più o meno) direttamente a 8.8.8.8.

Se l'utente a 8.8.8.8 decide di provare a hackerare la nostra rete e afferma di inviare i suoi messaggi da 192.168.11.2 il router sa che il traffico proveniente da 192.168.11.2 è valido solo dai dispositivi LAN e tipicamente bloccherà quel traffico.

Il problema si verifica quando provi a fare un loop back nella LAN. Se il dispositivo LAN prova a connettersi a `rustdesk.example.com`, che sarà `172.16.16.1`. A questo punto il router ha molte scelte da fare. Ha appena inviato un messaggio dalla sua porta LAN alla sua porta WAN proveniente DA 192.168.11.2 andando a 172.16.16.1. Una volta che raggiunge la porta WAN questo messaggio è indistinguibile da solo dall'esempio sopra dove qualcuno su internet stava provando a hackerare la nostra rete.

La funzionalità NAT Loopback cambierà effettivamente la parte sorgente "Da 192.168.11.2" dell'indirizzo prima nel processo così sa che deve usare la tabella NAT per passare messaggi avanti e indietro tra il server e il client.

Se c'è un problema con le connessioni solo mentre sei dentro la LAN, ma funziona bene da fuori sede questo potrebbe essere il problema che stai avendo.


# Soluzioni
Ci sono tre modi per risolvere questo problema.

## 1. Configurare NAT Loopback sul tuo router
Potresti configurare NAT Loopback sul tuo router se sai come fare, ma configurare questo richiede conoscenza di networking. Alcuni router non hanno la capacità di regolare questa impostazione, quindi questa non è l'opzione migliore per tutti.

{{% notice note %}}
Un articolo da [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) spiega questo molto bene. Potresti iniziare a imparare da qui.
{{% /notice %}}

## 2. Distribuire un server DNS sulla tua LAN
Prima, scegli quale preferisci, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) o [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Potresti distribuirlo tramite docker, o potresti distribuirlo sullo stesso server del tuo Server RustDesk. L'esempio sotto ti mostrerà alcuni passaggi per questo esempio.

Entrambi sono bloccatori di pubblicità basati su DNS, ma potresti disabilitare questa funzionalità se non vuoi bloccare le pubblicità.

Prima, punta il tuo `dominio` all'IP LAN del tuo server RustDesk (per esempio `192.168.11.20`). Poi vai alle impostazioni `DHCP` del tuo router (Attenzione: NON WAN) e imposta il tuo `Primo` IP DNS al server dove hai distribuito AdGuard Home o Pi-hole. Il DNS `Secondario` potrebbe essere il DNS del tuo ISP o altro DNS pubblico, es. `1.1.1.1` per Cloudflare o `8.8.8.8` per Google, e hai finito!

Ecco un esempio:
### AdGuard Home
Bloccare le pubblicità può causare problemi, se non vuoi capire la soluzione e vuoi disabilitare questa funzionalità, clicca il bottone "Disabilita protezione".

![](images/adguard_home_disable_protection.png)
<br>

Vai alle impostazioni "Riscritture DNS".

![](images/adguard_home_click_dns_rewrites.png)
<br>

Clicca "Aggiungi riscrittura DNS", poi digita il tuo `dominio` e l'`IP LAN` del server nel campo.

![](images/adguard_home_dns_rewrite_dialog.png)

Ecco come appare il risultato finale.

![](images/adguard_home_dns_rewrite_final_result.png)

***Non dimenticare di assegnare il tuo AdGuard Home al DHCP LAN del tuo router!***
<hr>

### Pi-hole
Bloccare le pubblicità può causare problemi, se non vuoi capire la soluzione e vuoi disabilitare questa funzionalità, clicca il bottone "Indefinitamente" nel sottomenu "Disabilita Blocco".

![](images/pi_hole_disable_blocking.png)

Vai a "DNS Locale → Record DNS".
Digita il tuo `dominio` e `IP` nella casella, poi clicca "Aggiungi".

Per controllare i risultati finali, controlla le righe gialle in questa immagine.

![](images/pi_hole_local_dns_dns_records.png)

***Non dimenticare di assegnare il tuo Pi-hole al DHCP LAN del tuo router!***

## 3. Aggiungere regole al tuo file hosts
Questo metodo è raccomandato solo se hai un piccolo numero di dispositivi. Se hai molti dispositivi il metodo DNS è preferito. Altrimenti dovresti fare questo manualmente su ogni dispositivo che ha bisogno di accesso al server.

{{% notice warning %}}
Se questo metodo è usato su un dispositivo portatile come un laptop, non sarà in grado di connettersi al server quando è fuori dalla tua LAN.
{{% /notice %}}

Percorso per diversi OS:

### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Puoi modificare con privilegi elevati o puoi copiare questo file sul `Desktop` e modificarlo. Dopo averlo modificato, copialo indietro al percorso originale.

### macOS
```text
/etc/hosts
```
Potresti usare `vim`, è pre-installato.
```sh
sudo vim /etc/hosts
```

### Linux
```text
/etc/hosts
```
Potresti usare `vim` o `nano`.
```sh
sudo vim /etc/hosts
```

<hr>

Il formato è lo stesso in tutti e tre i sistemi operativi. `IP` prima seguito dal `dominio`. Una voce per riga.

Per esempio:
```text
192.168.11.20   rustdesk.example.com
```