---
title: MSI
weight: 49
---

El paquete MSI admite parámetros de línea de comandos para instalación silenciosa.

### Parámetros

### INSTALLFOLDER

La carpeta de instalación.

**Por defecto**: `[ProgramFiles6432Folder]\[app name]`, normalmente `C:\Program Files\[app name]`.


### CREATESTARTMENUSHORTCUTS

Si crear un acceso directo del menú de inicio.

**Por defecto**:
1. Instalación. Por defecto a `1`.
2. Actualización. Por defecto a las últimas opciones instaladas.

| N° | Valor | Descripción |
| :---: | :---: | :---: |
| 1 | `1` | Sí |
| 2 | `0` | No |
| 3 | `Y` | Sí, igual que `1` |
| 4 | `N` | No, igual que `0` |

### CREATEDESKTOPSHORTCUTS

Si crear un acceso directo de escritorio.

**Por defecto**:
1. Instalación. Por defecto a `1`.
2. Actualización. Por defecto a las últimas opciones instaladas.

| N° | Valor | Descripción |
| :---: | :---: | :---: |
| 1 | `1` | Sí |
| 2 | `0` | No |
| 3 | `Y` | Sí, igual que `1` |
| 4 | `N` | No, igual que `0` |

### INSTALLPRINTER

Si instalar una impresora. La impresora se usa para ejecutar los trabajos de impresión del lado controlado localmente.

Desde la versión `1.3.9`.

**Por defecto**:
1. Instalación. Por defecto a `1`.
2. Actualización. Por defecto a las últimas opciones instaladas.

| N° | Valor | Descripción |
| :---: | :---: | :---: |
| 1 | `1` | Sí |
| 2 | `0` | No |
| 3 | `Y` | Sí, igual que `1` |
| 4 | `N` | No, igual que `0` |

## Ejemplos

**Precaución**: Para versiones anteriores a `2024-08-05`, hay problemas con la instalación silenciosa y la reparación silenciosa. Por favor desinstale primero, luego instale.

### Instalar con parámetros de instalación

Instalación silenciosa, establecer la ruta de instalación, no crear acceso directo de escritorio, crear acceso directo del menú de inicio.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Nota**: `/l*v install.log` significa imprimir el registro de ejecución a `install.log`.

### Actualización, sin parámetros

Actualización con la ruta de instalación anterior y las opciones de instalación.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

### Actualización, modificar opciones de instalación

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```