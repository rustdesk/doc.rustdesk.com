---
title: MSI
weight: 49
---

>Pachetul MSI acceptă parametri din linia de comandă pentru instalare silențioasă.

## Parametri

## INSTALLFOLDER

Folderul de instalare.

**Implicit**: `[ProgramFiles6432Folder]\[app name]`, de obicei `C:\Program Files\[app name]`.


## CREATESTARTMENUSHORTCUTS

Dacă se creează sau nu scurtătura în meniul Start.

**Implicit**:
1. La instalare. Valoarea implicită este `1`.
2. La upgrade. Se păstrează opțiunile din instalarea precedentă.

| Nr. | Valoare | Descriere |
| :---: | :---: | :---: |
| 1 | `1` | Da |
| 2 | `0` | Nu |
| 3 | `Y` | Da, echivalent cu `1` |
| 4 | `N` | Nu, echivalent cu `0` |

## CREATEDESKTOPSHORTCUTS

Dacă se creează sau nu scurtătura pe desktop.

**Implicit**:
1. La instalare. Valoarea implicită este `1`.
2. La upgrade. Se păstrează opțiunile din instalarea precedentă.

| Nr. | Valoare | Descriere |
| :---: | :---: | :---: |
| 1 | `1` | Da |
| 2 | `0` | Nu |
| 3 | `Y` | Da, echivalent cu `1` |
| 4 | `N` | Nu, echivalent cu `0` |

## INSTALLPRINTER

Dacă se instalează un driver/printer. Imprimanta este folosită pentru a executa job-urile de imprimare ale părții controlate local.

Disponibil începând cu versiunea `1.3.9`.

**Implicit**:
1. La instalare. Valoarea implicită este `1`.
2. La upgrade. Se păstrează opțiunile din instalarea precedentă.

| Nr. | Valoare | Descriere |
| :---: | :---: | :---: |
| 1 | `1` | Da |
| 2 | `0` | Nu |
| 3 | `Y` | Da, echivalent cu `1` |
| 4 | `N` | Nu, echivalent cu `0` |

# Exemple

**Atenție**: Pentru versiunile anterioare datei `2024-08-05` există probleme cu instalarea silențioasă și reparațiile silențioase. Dezinstalați mai întâi, apoi instalați.

## Instalare cu parametri de instalare

Instalare silențioasă, setare cale de instalare, fără scurtătură pe desktop, cu scurtătură în meniul Start.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Notă**: `/l*v install.log` înseamnă înregistrarea jurnalului de execuție în `install.log`.

## Upgrade, fără parametri

Upgrade folosind calea și opțiunile de instalare anterioare.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## Upgrade, modificare opțiuni de instalare

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```