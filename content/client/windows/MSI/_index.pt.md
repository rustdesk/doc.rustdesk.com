---
title: MSI
weight: 49
---

O pacote MSI suporta parâmetros de linha de comando para instalação silenciosa.

### Parâmetros

### INSTALLFOLDER

A pasta de instalação.

**Padrão**: `[ProgramFiles6432Folder]\[app name]`, normalmente `C:\Program Files\[app name]`.


### CREATESTARTMENUSHORTCUTS

Se deve criar um atalho do menu iniciar.

**Padrão**:
1. Instalação. Padrão para `1`.
2. Atualização. Padrão para as últimas opções instaladas.

| Nº | Valor | Descrição |
| :---: | :---: | :---: |
| 1 | `1` | Sim |
| 2 | `0` | Não |
| 3 | `Y` | Sim, mesmo que `1` |
| 4 | `N` | Não, mesmo que `0` |

### CREATEDESKTOPSHORTCUTS

Se deve criar um atalho da área de trabalho.

**Padrão**:
1. Instalação. Padrão para `1`.
2. Atualização. Padrão para as últimas opções instaladas.

| Nº | Valor | Descrição |
| :---: | :---: | :---: |
| 1 | `1` | Sim |
| 2 | `0` | Não |
| 3 | `Y` | Sim, mesmo que `1` |
| 4 | `N` | Não, mesmo que `0` |

### INSTALLPRINTER

Se deve instalar uma impressora. A impressora é usada para executar os trabalhos de impressão do lado controlado localmente.

Desde a versão `1.3.9`.

**Padrão**:
1. Instalação. Padrão para `1`.
2. Atualização. Padrão para as últimas opções instaladas.

| Nº | Valor | Descrição |
| :---: | :---: | :---: |
| 1 | `1` | Sim |
| 2 | `0` | Não |
| 3 | `Y` | Sim, mesmo que `1` |
| 4 | `N` | Não, mesmo que `0` |

## Exemplos

**Cuidado**: Para versões anteriores a `2024-08-05`, há problemas com instalação silenciosa e reparo silencioso. Por favor desinstale primeiro, depois instale.

### Instalar com parâmetros de instalação

Instalação silenciosa, definir o caminho de instalação, não criar atalho da área de trabalho, criar atalho do menu iniciar.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**Nota**: `/l*v install.log` significa imprimir o log de execução para `install.log`.

### Atualização, sem parâmetros

Atualização com o caminho de instalação anterior e opções de instalação.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

### Atualização, modificar opções de instalação

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```