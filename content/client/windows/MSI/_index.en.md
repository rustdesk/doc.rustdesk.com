---
title: MSI
weight: 49
description: "Install RustDesk on Windows with the MSI package and command-line parameters for silent deployment. Learn how to set the install folder, shortcuts, printer support, and upgrade options with msiexec."
keywords: ["rustdesk msi", "rustdesk silent install", "rustdesk msiexec", "rustdesk windows msi", "rustdesk installfolder", "rustdesk printer install"]
---

Use the RustDesk MSI package when you need silent Windows deployment with `msiexec` and installation parameters.

The MSI package supports command line parameters for silent installation.

## Parameters

## INSTALLFOLDER

The installation folder.

**Default**: `[ProgramFiles6432Folder]\[app name]`, usually `C:\Program Files\[app name]`.


## CREATESTARTMENUSHORTCUTS

Whether to create a start menu shortcut.

**Default**:
1. Install. Defaults to `1`.
2. Upgrade. Defaults to the last installed options.

| No | Value | Desc |
| :---: | :---: | :---: |
| 1 | `1` | Yes |
| 2 | `0` | No |
| 3 | `Y` | Yes, same as `1` |
| 4 | `N` | No, same as `0` |

## CREATEDESKTOPSHORTCUTS

Whether to create a desktop shortcut.

**Default**:
1. Install. Defaults to `1`.
2. Upgrade. Defaults to the last installed options.

| No | Value | Desc |
| :---: | :---: | :---: |
| 1 | `1` | Yes |
| 2 | `0` | No |
| 3 | `Y` | Yes, same as `1` |
| 4 | `N` | No, same as `0` |

## INSTALLPRINTER

Whether to install a printer. The printer is used to execute the print jobs of the controlled side locally.

Since version `1.3.9`.

**Default**:
1. Install. Defaults to `1`.
2. Upgrade. Defaults to the last installed options.

| No | Value | Desc |
| :---: | :---: | :---: |
| 1 | `1` | Yes |
| 2 | `0` | No |
| 3 | `Y` | Yes, same as `1` |
| 4 | `N` | No, same as `0` |

# Examples

**Caution**: For versions prior to `2024-08-05`, there are issues with silent installation and silent repair. Please uninstall first, then install.

## Install with installation parameters

Silent installation, set the installation path, do not create a desktop shortcut, create a start menu shortcut.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Note**: `/l*v install.log` means printing the execution log to `install.log`.

## Upgrade, without parameters

Upgrade with the previous installation path and installation options.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## Upgrade, modify installation options

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```
