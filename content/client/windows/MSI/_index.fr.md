---
title: MSI
weight: 49
---

Le package MSI prend en charge les paramètres de ligne de commande pour l'installation silencieuse.

## Paramètres

## INSTALLFOLDER

Le dossier d'installation.

**Par défaut** : `[ProgramFiles6432Folder]\[app name]`, généralement `C:\Program Files\[app name]`.


## CREATESTARTMENUSHORTCUTS

Indique s'il faut créer un raccourci du menu démarrer.

**Par défaut** :
1. Installation. Par défaut à `1`.
2. Mise à niveau. Par défaut aux dernières options installées.

| N° | Valeur | Description |
| :---: | :---: | :---: |
| 1 | `1` | Oui |
| 2 | `0` | Non |
| 3 | `Y` | Oui, identique à `1` |
| 4 | `N` | Non, identique à `0` |

## CREATEDESKTOPSHORTCUTS

Indique s'il faut créer un raccourci de bureau.

**Par défaut** :
1. Installation. Par défaut à `1`.
2. Mise à niveau. Par défaut aux dernières options installées.

| N° | Valeur | Description |
| :---: | :---: | :---: |
| 1 | `1` | Oui |
| 2 | `0` | Non |
| 3 | `Y` | Oui, identique à `1` |
| 4 | `N` | Non, identique à `0` |

## INSTALLPRINTER

Indique s'il faut installer une imprimante. L'imprimante est utilisée pour exécuter les tâches d'impression du côté contrôlé localement.

Depuis la version `1.3.9`.

**Par défaut** :
1. Installation. Par défaut à `1`.
2. Mise à niveau. Par défaut aux dernières options installées.

| N° | Valeur | Description |
| :---: | :---: | :---: |
| 1 | `1` | Oui |
| 2 | `0` | Non |
| 3 | `Y` | Oui, identique à `1` |
| 4 | `N` | Non, identique à `0` |

# Exemples

**Attention** : Pour les versions antérieures à `2024-08-05`, il y a des problèmes avec l'installation silencieuse et la réparation silencieuse. Veuillez d'abord désinstaller, puis installer.

## Installation avec paramètres d'installation

Installation silencieuse, définir le chemin d'installation, ne pas créer de raccourci de bureau, créer un raccourci du menu démarrer.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Note** : `/l*v install.log` signifie imprimer le journal d'exécution dans `install.log`.

## Mise à niveau, sans paramètres

Mise à niveau avec le chemin d'installation précédent et les options d'installation.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## Mise à niveau, modifier les options d'installation

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```