---
title: Windows
weight: 4
description: "Documentação do RustDesk sobre Windows. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## Qual guia do Windows você deve escolher?

| Necessidade | Melhor guia |
| --- | --- |
| Instalação padrão do cliente Windows | [Windows](/docs/pt/client/windows/) |
| Implantação gerenciada, instalação silenciosa ou empacotamento | [MSI](/docs/pt/client/windows/msi/) |
| Modo portátil com suporte a elevação | [Windows Portable Elevation](/docs/pt/client/windows/windows-portable-elevation/) |

## Respostas rápidas para Windows

- Para a maioria dos usuários finais, o instalador padrão é suficiente.
- Para rollouts corporativos ou instalações por script, use o guia MSI.
- Se você precisa solicitar privilégios de administrador no modo portátil, use portable elevation.
- Se estiver fazendo self-hosting, combine isso com [Client Deployment](/docs/pt/self-host/client-deployment/) para as configurações distribuídas pelo servidor.

{{% children depth="3" showhidden="true" %}}