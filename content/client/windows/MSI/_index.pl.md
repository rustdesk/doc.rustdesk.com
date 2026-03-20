---
title: MSI
weight: 49
description: "Dokumentacja RustDesk dotycząca MSI. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["rustdesk msi", "rustdesk silent install", "rustdesk msiexec", "rustdesk windows msi", "rustdesk installfolder", "rustdesk printer install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Szybka odpowiedź

Użyj pakietu MSI, gdy potrzebujesz standardowego wdrożenia oprogramowania Windows z parametrami instalacji, instalacją cichą oraz wsparciem narzędzi firmowych takich jak Intune czy Zasady grupy.

## Najważniejsze punkty

- MSI dobrze pasuje do zarządzanych wdrożeń Windows
- Przed pierwszym rolloutem sprawdź parametry instalacji
- Przetestuj zachowanie aktualizacji z oraz bez zmiany opcji

<!-- GEO-LOCALIZED-INTRO:END -->

Paczka MSI obsługuje parametry linii poleceń w ramach instalacji w trybie cichym.

## Parametry

## INSTALLFOLDER

Folder instalacyjny.

**Domyślnie**: `[ProgramFiles6432Folder]\[app name]`, zazwyczaj `C:\Program Files\[app name]`.


## CREATESTARTMENUSHORTCUTS

Stwórz skrót w menu startowym.

**Domyślnie**:
1. Podczas instalacji. Domyślnie `1`.
2. Podczas aktualizacji. Domyślnie przybiera wartość wybraną podczas ostatniej instalacji.

| Nr | Wartość | Opis |
| :---: | :---: | :---: |
| 1 | `1` | Tak |
| 2 | `0` | Nie |
| 3 | `Y` | Tak, to samo co `1` |
| 4 | `N` | Nie, to samo co `0` |

## CREATEDESKTOPSHORTCUTS

Stwórz skrót na pulpicie.

**Domyślnie**:
1. Podczas instalacji. Domyślnie `1`.
2. Podczas aktualizacji. Domyślnie przybiera wartość wybraną podczas ostatniej instalacji.

| Nr | Wartość | Opis |
| :---: | :---: | :---: |
| 1 | `1` | Tak |
| 2 | `0` | Nie |
| 3 | `Y` | Tak, to samo co `1` |
| 4 | `N` | Nie, to samo co `0` |

## INSTALLPRINTER

Zainstaluj drukarkę. Drukarka jest używana do wykonywania druków ze strony lokalnej.

Od wersji `1.3.9`.

**Domyślnie**:
1. Podczas instalacji. Domyślnie `1`.
2. Podczas aktualizacji. Domyślnie przybiera wartość wybraną podczas ostatniej instalacji.

| Nr | Wartość | Opis |
| :---: | :---: | :---: |
| 1 | `1` | Tak |
| 2 | `0` | Nie |
| 3 | `Y` | Tak, to samo co `1` |
| 4 | `N` | Nie, to samo co `0` |

# Przykłady

**Ostrzeżenie**: Dla wersji sprzed `05-08-2024`, występują problemy z instalacją i naprawą w trybie cichym. Należy najpierw odinstalować i zainstalować ponownie.

## Instalacja z parametrami

Instalacja w trybie cichym: ustaw ścieżkę instalacji, nie twórz skrótu na pulpicie, stwórz skrót w menu startowym.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Informacja**: `/l*v install.log` oznacza zapisywanie logów wykonywania do `install.log`.

## Aktualizacja bez parametrów

Aktualizacja z poprzednią ścieżką i opcjami instalacji.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## Aktualizacja ze zmienionymi parametrami

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```
