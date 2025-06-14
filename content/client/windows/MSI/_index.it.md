---
title: MSI
weight: 49
---

Il pacchetto MSI supporta parametri della riga di comando per l'installazione silenziosa.

### Parametri

### INSTALLFOLDER

La cartella di installazione.

**Predefinito**: `[ProgramFiles6432Folder]\[app name]`, di solito `C:\Program Files\[app name]`.


### CREATESTARTMENUSHORTCUTS

Se creare un collegamento nel menu start.

**Predefinito**:
1. Installazione. Predefinito a `1`.
2. Aggiornamento. Predefinito alle ultime opzioni installate.

| N. | Valore | Descrizione |
| :---: | :---: | :---: |
| 1 | `1` | Sì |
| 2 | `0` | No |
| 3 | `Y` | Sì, uguale a `1` |
| 4 | `N` | No, uguale a `0` |

### CREATEDESKTOPSHORTCUTS

Se creare un collegamento sul desktop.

**Predefinito**:
1. Installazione. Predefinito a `1`.
2. Aggiornamento. Predefinito alle ultime opzioni installate.

| N. | Valore | Descrizione |
| :---: | :---: | :---: |
| 1 | `1` | Sì |
| 2 | `0` | No |
| 3 | `Y` | Sì, uguale a `1` |
| 4 | `N` | No, uguale a `0` |

### INSTALLPRINTER

Se installare una stampante. La stampante è utilizzata per eseguire i lavori di stampa del lato controllato localmente.

Dalla versione `1.3.9`.

**Predefinito**:
1. Installazione. Predefinito a `1`.
2. Aggiornamento. Predefinito alle ultime opzioni installate.

| N. | Valore | Descrizione |
| :---: | :---: | :---: |
| 1 | `1` | Sì |
| 2 | `0` | No |
| 3 | `Y` | Sì, uguale a `1` |
| 4 | `N` | No, uguale a `0` |

## Esempi

**Attenzione**: Per le versioni precedenti al `2024-08-05`, ci sono problemi con l'installazione silenziosa e la riparazione silenziosa. Si prega di disinstallare prima, poi installare.

### Installazione con parametri di installazione

Installazione silenziosa, impostare il percorso di installazione, non creare collegamento desktop, creare collegamento menu start.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Nota**: `/l*v install.log` significa stampare il log di esecuzione in `install.log`.

### Aggiornamento, senza parametri

Aggiornamento con il percorso di installazione precedente e le opzioni di installazione.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

### Aggiornamento, modificare le opzioni di installazione

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```