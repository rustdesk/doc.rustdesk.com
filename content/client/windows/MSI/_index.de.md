---
title: MSI
weight: 49
---

Das MSI-Paket unterstützt Befehlszeilenparameter für die stille Installation.

### Parameter

### INSTALLFOLDER

Der Installationsordner.

**Standard**: `[ProgramFiles6432Folder]\[app name]`, normalerweise `C:\Program Files\[app name]`.


### CREATESTARTMENUSHORTCUTS

Ob eine Startmenü-Verknüpfung erstellt werden soll.

**Standard**:
1. Installation. Standard ist `1`.
2. Upgrade. Standard sind die zuletzt installierten Optionen.

| Nr. | Wert | Beschreibung |
| :---: | :---: | :---: |
| 1 | `1` | Ja |
| 2 | `0` | Nein |
| 3 | `Y` | Ja, gleich wie `1` |
| 4 | `N` | Nein, gleich wie `0` |

### CREATEDESKTOPSHORTCUTS

Ob eine Desktop-Verknüpfung erstellt werden soll.

**Standard**:
1. Installation. Standard ist `1`.
2. Upgrade. Standard sind die zuletzt installierten Optionen.

| Nr. | Wert | Beschreibung |
| :---: | :---: | :---: |
| 1 | `1` | Ja |
| 2 | `0` | Nein |
| 3 | `Y` | Ja, gleich wie `1` |
| 4 | `N` | Nein, gleich wie `0` |

### INSTALLPRINTER

Ob ein Drucker installiert werden soll. Der Drucker wird verwendet, um die Druckaufträge der kontrollierten Seite lokal auszuführen.

Seit Version `1.3.9`.

**Standard**:
1. Installation. Standard ist `1`.
2. Upgrade. Standard sind die zuletzt installierten Optionen.

| Nr. | Wert | Beschreibung |
| :---: | :---: | :---: |
| 1 | `1` | Ja |
| 2 | `0` | Nein |
| 3 | `Y` | Ja, gleich wie `1` |
| 4 | `N` | Nein, gleich wie `0` |

## Beispiele

**Vorsicht**: Für Versionen vor `2024-08-05` gibt es Probleme mit stiller Installation und stiller Reparatur. Bitte deinstallieren Sie zuerst, dann installieren Sie.

### Installation mit Installationsparametern

Stille Installation, Installationspfad festlegen, keine Desktop-Verknüpfung erstellen, Startmenü-Verknüpfung erstellen.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Hinweis**: `/l*v install.log` bedeutet, das Ausführungsprotokoll in `install.log` zu drucken.

### Upgrade, ohne Parameter

Upgrade mit dem vorherigen Installationspfad und den Installationsoptionen.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

### Upgrade, Installationsoptionen ändern

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```