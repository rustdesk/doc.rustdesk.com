---
title: Mac 
weight: 3
---

## Installazione

Apri il file .dmg e trascina `RustDesk` in `Applicazioni` come mostrato di seguito.

![](/docs/en/client/mac/images/dmg.png)

Assicurati di aver chiuso tutte le istanze di RustDesk in esecuzione. Assicurati anche di chiudere il servizio RustDesk mostrato nella barra delle applicazioni.

![](/docs/en/client/mac/images/tray.png)

## Consentire l'esecuzione di RustDesk

| Sblocca per modificare | Clicca su `App Store e sviluppatori identificati` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Abilitare i permessi

{{% notice note %}}
A causa del cambiamento della politica di sicurezza di macOS, la nostra API che cattura l'input sul lato locale non funziona più. È necessario abilitare il permesso "Monitoraggio input" sul lato Mac locale.
Segui questo
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

Nella versione 1.2.4, puoi provare `Input source 2` che può essere visualizzato cliccando sull'icona della tastiera nella barra degli strumenti.
{{% /notice %}}

Per catturare lo schermo, devi concedere a RustDesk il permesso di **Accessibilità** e il permesso di **Registrazione schermo**. RustDesk ti guiderà alla finestra delle impostazioni.

| Finestra RustDesk | Finestra impostazioni |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Se l'hai abilitato nella finestra delle impostazioni, ma RustDesk continua ad avvisare. Rimuovi `RustDesk` dalla finestra delle impostazioni con il pulsante `-`, e clicca sul pulsante `+`, seleziona `RustDesk` in `Applicazioni`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Altri tentativi inutili: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
È comunque richiesto il riavvio.
{{% /notice %}}

| Pulsanti `-` e `+` | Seleziona `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Ripeti i passaggi sopra per il permesso di **Registrazione schermo**.

![](/docs/en/client/mac/images/screen.png?v2)