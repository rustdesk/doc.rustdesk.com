---
title: MSI
weight: 49
---

O pacote MSI suporta parâmetros de linha de comando para instalação silenciosa.

### Parâmetros

### INSTALLFOLDER
A pasta de instalação.

**Padrão**: `[ProgramFiles6432Folder]\[nome do aplicativo]`, geralmente `C:\Program Files\[nome do aplicativo]`.

### CREATESTARTMENUSHORTCUTS

Se criar um atalho no menu Iniciar.

**Padrão**:

1. Instalação: Padrão é `1`.
2. Atualização: Padrão é as últimas opções instaladas.

| Número | Valor | Descrição |
| :---: | :---: | :---: |
| 1 | `1` | Sim |
| 2 | `0` | Não |
| 3 | `Y` | Sim, mesmo que `1` |
| 4 | `N` | Não, mesmo que `0` |

### CREATEDESKTOPSHORTCUTS

Se criar um atalho na área de trabalho.

**Padrão**:

Instalação: Padrão é `1`.
Atualização: Padrão é as últimas opções instaladas.

| Número | Valor | Descrição |
| :---: | :---: | :---: |
| 1 | `1` | Sim |
| 2 | `0` | Não |
| 3 | `Y` | Sim, mesmo que `1` |
| 4 | `N` | Não, mesmo que `0` |

## Exemplos

**Atenção**: Para versões anteriores a `2024-08-05`, há problemas com instalação silenciosa e reparo silencioso. Por favor, desinstale primeiro e depois instale.

### Instalação com parâmetros de instalação

Instalação silenciosa, define o caminho de instalação, não cria um atalho na área de trabalho, cria um atalho no menu Iniciar.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" /l*v install.log
```

**Nota**: `/l*v install.log` significa salvar o log de execução em `install.log`.

### Atualização, sem parâmetros

Atualiza com o caminho de instalação anterior e opções de instalação.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

### Atualização, modificar opções de instalação

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" /l*v install.log
```
